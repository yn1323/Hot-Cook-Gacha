export const RevalidateTags = {
  recipe: 'recipe',
  gacha: 'gacha',
} as const

export type RevalidateTagType =
  (typeof RevalidateTags)[keyof typeof RevalidateTags]
