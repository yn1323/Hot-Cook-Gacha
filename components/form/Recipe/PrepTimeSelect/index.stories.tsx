import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { PrepTimeSelect } from '@/components/form/Recipe/PrepTimeSelect'
import { FormProviderDecorator } from '@/config/Decorators'
import { recipeSchemas } from '@/src/constants/validations'

const meta = {
  title: 'form/Recipe/PrepTimeSelect',
  component: PrepTimeSelect,
  args: {},
  parameters: {},
  decorators: [
    FormProviderDecorator,
    (_, { args }) => {
      const Schema = z.object({ prepTime: recipeSchemas.shape.prepTime })
      type SchemaType = z.infer<typeof Schema>
      const methods = useForm<SchemaType>({
        resolver: zodResolver(Schema),
      })
      const onSubmit: SubmitHandler<SchemaType> = data => {}

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <PrepTimeSelect {...args} />
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
} satisfies Meta<typeof PrepTimeSelect>
export default meta

export const Basic: StoryObj<typeof meta> = {}
