import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { UserPictureInput } from '.'

const meta = {
  title: 'form/UserPictureInput',
  component: UserPictureInput,
  args: {
    url: 'https://lh3.googleusercontent.com/a/AAcHTteNUbFSDCKPuY0bSF-oqnRwT0RUmlKcZtBXjEAPAg=s96-c',
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof UserPictureInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}
