import { ForgotPasswordForm } from '@/component/feature/login/ForgotPasswordForm'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'

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
