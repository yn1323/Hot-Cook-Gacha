export const RevalidateTags = {
  recipe: 'recipe',
} as const

export type RevalidateTagType =
  (typeof RevalidateTags)[keyof typeof RevalidateTags]
