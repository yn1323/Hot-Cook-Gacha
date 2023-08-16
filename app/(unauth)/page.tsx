import { LoginForm } from '@/components/feature/login/LoginForm'
import { Animation } from '@/components/layout/Animation'
import { CenterBox } from '@/components/layout/CenterBox'

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
