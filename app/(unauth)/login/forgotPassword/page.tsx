import { ForgotPasswordForm } from '@/components/feature/login/ForgotPasswordForm'
import { Animation } from '@/components/layout/Animation'
import { CenterBox } from '@/components/layout/CenterBox'

const ForgotPassword = () => {
  return (
    <Animation>
      <CenterBox>
        <ForgotPasswordForm />
      </CenterBox>
    </Animation>
  )
}

export default ForgotPassword
