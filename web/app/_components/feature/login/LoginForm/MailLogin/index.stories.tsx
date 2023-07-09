import type { Meta, StoryObj } from '@storybook/react'
import { MailLogin } from '.'

const meta = {
  title: 'feature/Login/LoginForm/MailLogin',
  component: MailLogin,
  args: {
    isLoading: false,
    onSubmit: () => {},
  },
  parameters: {},
} satisfies Meta<typeof MailLogin>
export default meta

export const Basic: StoryObj<typeof meta> = {}
