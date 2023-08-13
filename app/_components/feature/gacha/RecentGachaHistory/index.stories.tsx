import { Meta, StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { rest } from "msw";
import { RecentGachaHistory  } from ".";

const meta = {
  title: 'feature/gacha/RecentGachaHistory',
  component: RecentGachaHistory,
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
} satisfies Meta<typeof RecentGachaHistory >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
