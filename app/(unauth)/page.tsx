import { LoginForm } from '@/component/feature/login/LoginForm'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'

const Home = () => {
  return (
    <Animation>
      <CenterBox>
        <LoginForm />
      </CenterBox>
    </Animation>
  )
}

export default Home
