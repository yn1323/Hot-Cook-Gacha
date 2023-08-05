import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormProviderDecorator } from '@/config/Decorators'
import { gachaSchemas } from '@/constants/validations'
import { TermSelect } from '.'

const meta = {
  title: 'form/Gacha/TermSelect',
  component: TermSelect,
  args: {
    disabled: false,
  },
  parameters: {},
  decorators: [
    FormProviderDecorator,
    (_, { args }) => {
      const Schema = z.object({ term: gachaSchemas.shape.term })
      type SchemaType = z.infer<typeof Schema>
      const methods = useForm<SchemaType>({
        resolver: zodResolver(Schema),
      })
      const onSubmit: SubmitHandler<SchemaType> = data => {}

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TermSelect {...args} />
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
} satisfies Meta<typeof TermSelect>
export default meta

export const Basic: StoryObj<typeof meta> = {}
