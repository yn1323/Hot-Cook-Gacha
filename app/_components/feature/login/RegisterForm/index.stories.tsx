import type { Meta, StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { RegisterForm  } from ".";

const meta = {
  title: 'feature/login/RegisterForm',
  component: RegisterForm ,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof RegisterForm >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
