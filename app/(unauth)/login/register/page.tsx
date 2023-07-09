import { RegisterForm } from '@/component/feature/login/RegisterForm'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'

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
