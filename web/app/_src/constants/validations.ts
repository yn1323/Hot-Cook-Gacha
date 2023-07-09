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
