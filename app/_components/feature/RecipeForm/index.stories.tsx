import { type Meta, type StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { RecipeForm  } from ".";

const meta = {
  title: 'feature/RecipeForm',
  component: RecipeForm ,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof RecipeForm >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
