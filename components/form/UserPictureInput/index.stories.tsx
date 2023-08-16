import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Meta, type StoryObj } from '@storybook/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserPictureInput } from '@/components/form/UserPictureInput'
import { FormProviderDecorator } from '@/config/Decorators'
import { commonSchemas } from '@/src/constants/validations'

const meta = {
  title: 'form/UserPictureInput',
  component: UserPictureInput,
  args: {
    url: 'https://lh3.googleusercontent.com/a/AAcHTteNUbFSDCKPuY0bSF-oqnRwT0RUmlKcZtBXjEAPAg=s96-c',
  },
  parameters: {},
  decorators: [
    FormProviderDecorator,
    (_, { args }) => {
      const Schema = z.object({ picture: commonSchemas.shape.picture })
      type SchemaType = z.infer<typeof Schema>
      const methods = useForm<SchemaType>({
        resolver: zodResolver(Schema),
      })
      const onSubmit: SubmitHandler<SchemaType> = data => {}

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <UserPictureInput {...args} />
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
} satisfies Meta<typeof UserPictureInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}
