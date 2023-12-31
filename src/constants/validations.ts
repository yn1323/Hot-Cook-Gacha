import { z } from 'zod'

export const commonSchemas = z.object({
  email: z
    .string()
    .nonempty('必須入力です')
    .email('メールアドレスの形式で入力してください。'),
  password: z
    .string()
    .nonempty('必須入力です')
    .min(8, '8文字以上16文字以内で入力してください。')
    .max(16, '8文字以上16文字以内で入力してください。'),
  name: z
    .string()
    .nonempty('必須入力です')
    .max(40, '40文字以内で入力してください。'),
  picture: z.string().optional(),
})

export const recipeSchemas = z.object({
  title: z
    .string()
    .nonempty('必須入力です')
    .max(40, '40文字以内で入力してください。'),
  description: z
    .string()
    .max(100, '100文字以内で入力してください。')
    .optional(),
  image: z.string().optional(),
  genre: z.string().nonempty('必須選択です'), // 洋風・和風など（セレクトボックスにしたい）
  type: z.string().nonempty('必須選択です'), // 朝食・昼食・夕食、麺類、ご飯ものなど（セレクトボックスにしたい）
  prepTime: z.number(), // 調理時間

  servings: z.string(), // 何人前
  ingredients: z.array(
    z.object({
      amount: z
        .string()
        .nonempty('必須入力です')
        .max(40, '40文字以内で入力してください。'),
      ingredient: z
        .string()
        .nonempty('必須入力です')
        .max(40, '40文字以内で入力してください。'),
      mark: z.string().optional(),
      prep: z.string().max(40, '40文字以内で入力してください。').optional(), // 切り方的な
      unit: z.string().optional(), // 単位（セレクトボックスにしたい）
    })
  ),
  preDirections: z
    .array(
      z.object({
        direction: z
          .string()
          .max(400, '1ステップ 400文字以内で入力してください。'),
        image: z.string().optional(),
      })
    )
    .max(20, '20ステップ以内で入力してください。'),
  hotcookDirections: z
    .array(
      z.object({
        direction: z
          .string()
          .nonempty('必須入力です')
          .max(400, '400文字以内で入力してください。'),
        image: z.string().optional(),
      })
    )
    .nonempty('必須入力です'),
  postDirections: z
    .array(
      z.object({
        direction: z
          .string()
          .max(400, '1ステップ 400文字以内で入力してください。'),
        image: z.string().optional(),
      })
    )
    .max(20, '20ステップ以内で入力してください。'),

  isPublic: z.boolean(), // 公開・非公開
  tags: z.array(z.string()).max(5, 'タグは5個以内にしてください。').optional(), // 任意のタグ
})

export const gachaSchemas = z.object({
  term: z.string().nonempty('必須入力です'),
  cookPerDay: z.string().nonempty('必須入力です'),
})
