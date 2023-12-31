import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { IngredientsInput } from '@/components/form/Recipe/IngredientsInput'
import { FormProviderDecorator } from '@/config/Decorators'
import { recipeSchemas } from '@/src/constants/validations'

const meta = {
  title: 'form/Recipe/IngredientsInput',
  component: IngredientsInput,
  args: {},
  parameters: {},
  decorators: [
    FormProviderDecorator,
    (_, { args }) => {
      const Schema = z.object({ ingredients: recipeSchemas.shape.ingredients })
      type SchemaType = z.infer<typeof Schema>
      const methods = useForm<SchemaType>({
        defaultValues: {
          ingredients: [
            { ingredient: '', amount: '', mark: '', prep: '', unit: '' },
          ],
        },
        resolver: zodResolver(Schema),
      })
      const onSubmit: SubmitHandler<SchemaType> = data => {}

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <IngredientsInput {...args} />
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
} satisfies Meta<typeof IngredientsInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}
