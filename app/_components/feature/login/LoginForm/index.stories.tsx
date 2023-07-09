import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from '.'

const meta = {
  title: 'feature/login/LoginForm',
  component: LoginForm,
  parameters: {
    args: {},
  },
} satisfies Meta<typeof LoginForm>
export default meta

export const Basic: StoryObj<typeof meta> = {}
