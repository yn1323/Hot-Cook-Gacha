import { Meta, StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { rest } from "msw";
import { {{ inputs.component | pascal }}  } from ".";

const meta = {
  title: '{{ inputs.path }}/{{ inputs.component | pascal }}',
  component: {{ inputs.component | pascal }},
  args: {},
  parameters: {
    msw: {
      handlers: [
        rest.get("/user", (_, res, ctx) => {
          return res(
            ctx.json({
              firstName: "Neil",
              lastName: "Maverick",
            })
          );
        }),
      ],
    },
  },
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof {{ inputs.component | pascal }} >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
