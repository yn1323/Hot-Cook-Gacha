import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormProviderDecorator } from '@/config/Decorators'
import { recipeSchemas } from '@/constants/validations'
import { Tag } from '.'

const meta = {
  title: 'form/Recipe/Tag',
  component: Tag,
  args: {
    disabled: false,
  },
  parameters: {},
  decorators: [
    FormProviderDecorator,
    (_, { args }) => {
      const Schema = z.object({ tags: recipeSchemas.shape.tags })
      type SchemaType = z.infer<typeof Schema>
      const methods = useForm<SchemaType>({
        defaultValues: { tags: ['aaa', 'bbbb'] },
        resolver: zodResolver(Schema),
      })
      const onSubmit: SubmitHandler<SchemaType> = data => {
        console.log(data)
      }

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Tag {...args} />
            <Box textAlign="right">
              <Button colorScheme="green" mt={4} type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </FormProvider>
      )
    },
  ],
} satisfies Meta<typeof Tag>
export default meta

export const Basic: StoryObj<typeof meta> = {}
