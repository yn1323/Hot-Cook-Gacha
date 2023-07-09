import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { UserConfigForm } from '.'

const meta = {
  title: 'feature/userConfig/UserConfigForm',
  component: UserConfigForm,
  args: {
    uid: 'hoge',
    onSubmit: async function onSubmit() {
      return true
    },
    defaultValues: {
      name: 'user name',
      picture:
        'https://lh3.googleusercontent.com/a/AAcHTteNUbFSDCKPuY0bSF-oqnRwT0RUmlKcZtBXjEAPAg=s96-c',
    },
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof UserConfigForm>
export default meta

export const Basic: StoryObj<typeof meta> = {}
