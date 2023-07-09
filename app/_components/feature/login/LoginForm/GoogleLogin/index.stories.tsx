import type { Meta, StoryObj } from '@storybook/react'
import { GoogleLogin } from '.'

const meta = {
  title: 'feature/login/LoginForm/GoogleLogin',
  component: GoogleLogin,
  args: {
    handleGoogleLogin: () => {},
    isLoading: false,
  },
  parameters: {},
} satisfies Meta<typeof GoogleLogin>
export default meta

export const Basic: StoryObj<typeof meta> = {}
