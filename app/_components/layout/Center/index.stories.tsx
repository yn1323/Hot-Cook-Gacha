import { type Meta, type StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { Center  } from ".";

const meta = {
  title: 'layout/Center',
  component: Center ,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof Center >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
