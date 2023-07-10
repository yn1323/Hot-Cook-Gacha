import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Meta, type StoryObj } from '@storybook/react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { FormProviderDecorator } from '@/config/Decorators'
import { recipeSchemas } from '@/constants/validations'
import { ImageInput } from '.'

const meta = {
  title: 'form/recipe/ImageInput',
  component: ImageInput,
  args: {
    url: '',
    label: '料理の写真',
  },
  parameters: {},
  decorators: [
    FormProviderDecorator,
    (_, { args }) => {
      const Schema = z.object({ image: recipeSchemas.shape.image })
      type SchemaType = z.infer<typeof Schema>
      const methods = useForm<SchemaType>({
        resolver: zodResolver(Schema),
      })
      const onSubmit: SubmitHandler<SchemaType> = data => {}

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ImageInput {...args} />
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
} satisfies Meta<typeof ImageInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}
