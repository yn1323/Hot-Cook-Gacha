import type { Meta, StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { ForgotPasswordForm  } from ".";

const meta = {
  title: 'feature/login/ForgotPasswordForm',
  component: ForgotPasswordForm ,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof ForgotPasswordForm >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
