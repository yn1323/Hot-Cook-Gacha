import { type Meta, type StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { {{ inputs.component | pascal }}  } from ".";

const meta = {
  title: '{{ inputs.path }}/{{ inputs.component | pascal }}',
  component: {{ inputs.component | pascal }} ,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof {{ inputs.component | pascal }} >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
