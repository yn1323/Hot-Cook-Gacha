import { RegisterForm } from '@/components/feature/login/RegisterForm'
import { Animation } from '@/components/layout/Animation'
import { CenterBox } from '@/components/layout/CenterBox'

const LoginRegister = () => {
  return (
    <Animation>
      <CenterBox>
        <RegisterForm />
      </CenterBox>
    </Animation>
  )
}

export default LoginRegister
