import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormProviderDecorator } from '@/config/Decorators'
import { recipeSchemas } from '@/src/constants/validations'
import { GenreSelect } from '.'

const meta = {
  title: 'form/Recipe/GenreSelect',
  component: GenreSelect,
  args: {},
  parameters: {},
  decorators: [
    FormProviderDecorator,
    (_, { args }) => {
      const Schema = z.object({ genre: recipeSchemas.shape.genre })
      type SchemaType = z.infer<typeof Schema>
      const methods = useForm<SchemaType>({
        resolver: zodResolver(Schema),
      })
      const onSubmit: SubmitHandler<SchemaType> = data => {
        console.log(data)
      }

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <GenreSelect {...args} />
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
} satisfies Meta<typeof GenreSelect>
export default meta

export const Basic: StoryObj<typeof meta> = {}
