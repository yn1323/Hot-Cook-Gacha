import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormProviderDecorator } from '@/config/Decorators'
import { recipeSchemas } from '@/constants/validations'
import { DirectionsInput } from '.'

const meta = {
  title: 'form/Recipe/DirectionsInput',
  component: DirectionsInput,
  args: {
    name: 'preDirections',
  },
  parameters: {},
  decorators: [
    FormProviderDecorator,
    (_, { args }) => {
      const Schema = z.object({
        [args.name]: recipeSchemas.shape[args.name],
      })
      type SchemaType = z.infer<typeof Schema>
      const methods = useForm<SchemaType>({
        defaultValues: {
          [args.name]: [{ direction: '', image: '' }],
        },
        resolver: zodResolver(Schema),
      })
      const onSubmit: SubmitHandler<SchemaType> = data => {}

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DirectionsInput {...args} />
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
} satisfies Meta<typeof DirectionsInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}
