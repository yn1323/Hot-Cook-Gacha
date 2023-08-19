'use server'

import console from 'console'
import process from 'process'
import { SchemaType } from '@/components/feature/recipe/RecipeForm'
import {
  debugCollection,
  serverCollection,
  serverProdCollection,
} from '@/src/firebase/server'
import { sleep } from '@/src/helpers/async'

export type AdminPostSchema = SchemaType

export async function registerRecipeFormAction(
  schema: AdminPostSchema,
  option: { uid?: string; recipeId?: string }
) {
  let error = false
  try {
    // 開発環境に登録
    await serverCollection
      .doc('search')
      .collection('recipes')
      .doc(option.recipeId ?? '')
      .set({
        ...schema,
        author: option.uid,
        recipeId: option.recipeId,
        dateCreated: new Date(),
        dateUpdated: new Date(),
        version: 1,
        comment: [],
        like: 0,
        random: Math.random(),
      })

    // 本番環境に登録
    await serverProdCollection
      .doc('search')
      .collection('recipes')
      .doc(option.recipeId ?? '')
      .set({
        ...schema,
        author: option.uid,
        recipeId: option.recipeId,
        dateCreated: new Date(),
        dateUpdated: new Date(),
        version: 1,
        comment: [],
        like: 0,
        random: Math.random(),
      })

    // 仮登録されたレシピをdoneに変更
    await skipRecipeAction(option.recipeId ?? '')
  } catch (e) {
    console.error(e)
    error = true
  }

  return {
    ok: !error,
  }
}

export async function skipRecipeAction(recipeId: string) {
  await debugCollection
    .doc('recipe')
    .collection('index')
    .doc(recipeId)
    .update({ done: true })

  await debugCollection
    .doc('recipe')
    .collection('detail')
    .doc(recipeId)
    .update({ done: true })

  return { status: 'ok' }
}

export async function countRestRecipe() {
  const snapshot = await debugCollection
    .doc('recipe')
    .collection('detail')
    .where('done', '==', false)
    .count()
    .get()

  return {
    restCount: snapshot.data().count,
  }
}

export async function getPendingRecipe() {
  const snapshot = await debugCollection
    .doc('recipe')
    .collection('detail')
    .where('done', '==', false)
    .limit(1)
    .get()

  if (snapshot.empty) {
    return {}
  }
  const data: any = { ...snapshot.docs[0].data(), id: snapshot.docs[0].id }

  const indexData = await debugCollection
    .doc('recipe')
    .collection('index')
    .doc(data.id)
    .get()

  const index = indexData.data()

  const methods = data.methods
    .filter((method: any) => !Number.isNaN(method.orderNumber))
    .reduce(
      (acc: any, cur: any) => {
        const isHotCookDirection =
          cur.text.includes('メニュー番号で探す') || cur.text.includes('→')
        if (isHotCookDirection) {
          acc.hotcookDirections.push(cur.text.replace(/#/g, ''))
          return acc
        }

        if (acc.hotcookDirections.length > 0) {
          acc.postDirections.push(cur.text)
        } else {
          acc.preDirections.push(cur.text)
        }

        return acc
      },
      {
        preDirections: [],
        hotcookDirections: [],
        postDirections: [],
      }
    )

  const convertedData: SchemaType = {
    title: data.name,
    description: '',
    image: '',
    genre: '',
    type: '',
    prepTime: parseInt(data.cooktime),

    servings: `${data.quantity.match(/(\d+)/)[1]}`,
    ingredients: data.materials.map((ingredient: any) => ({
      ingredient: ingredient.name,
      amount: ingredient.quantity,
      mark: '',
      prep: '',
      unit: '',
    })),

    preDirections: methods.preDirections.map((text: any) => ({
      direction: text as string,
      image: '',
    })),

    hotcookDirections: methods.hotcookDirections.map((text: any) => ({
      direction: text as string,
      image: '',
    })),

    postDirections: methods.postDirections.map((text: any) => ({
      direction: text as string,
      image: '',
    })),

    isPublic: true,
    tags: [],
  }

  return {
    recipe: convertedData,
    options: {
      url: `${process.env.NEXT_PUBLIC_RECIPE_URL}/${index?.modelName ?? ''}/${
        index?.code ?? ''
      }`,
      recipeId: data.id,
    },
  }
}

export async function postRecipeFormAction(
  schema: AdminPostSchema & { recipeId: string }
) {
  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .doc(schema.recipeId)
    .set({
      ...schema,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      version: 1,
      comment: [],
      like: 0,
      random: Math.random(),
    })

  return { status: 'ok' }
}

// 詳細を仮登録
const fetchAndRegisterDetail = async () => {
  const indexRes = await debugCollection.doc('recipe').collection('index').get()

  const allIndex: any[] = indexRes.docs.map(doc => {
    return { ...doc.data(), id: doc.id }
  })

  for (let i = 0; i < allIndex.length; i++) {
    const detail = allIndex[i]

    console.log(`code: ${detail.code}  docID: ${detail.id}`)
    const targetHTML = `${process.env.NEXT_PUBLIC_RECIPE_DETAIL_URL}/${detail.code}/${detail.modelName}`

    const html = await fetch(targetHTML)
    const res = await html.json()

    debugCollection
      .doc('recipe')
      .collection('detail')
      .doc(detail.id)
      .set({ ...res, done: false })
    await sleep(1000)
  }
}

// インデックスを仮登録
const fetchAndRegisterIndex = async () => {
  const Limit = 10

  const html = await fetch(process.env.NEXT_PUBLIC_RECIPE_INDEX_URL ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      offset: 0,
      limit: Limit,
      search: '',
      models: ['KN-HW24G'],
      cooktime: '',
      reservation: false,
      ignore_text: '',
      purposes: [],
      categories: [],
      genres: [],
    }),
  })
  const res = await html.json()
  const recipes: any[] = res.recipes
  const add = (recipe: any) => {
    debugCollection
      .doc('recipe')
      .collection('index')
      .add({ ...recipe, done: false })
  }

  await Promise.all(recipes.map(recipe => add(recipe)))
}
