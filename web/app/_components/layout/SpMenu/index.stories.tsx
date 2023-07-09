import type { Meta, StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { SpMenu  } from ".";

const meta = {
  title: 'layout/SpMenu',
  component: SpMenu ,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof SpMenu >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
