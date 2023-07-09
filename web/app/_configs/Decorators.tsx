import { FormProvider, useForm } from 'react-hook-form'

export const FormProviderDecorator = (Story: any) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  )
}
