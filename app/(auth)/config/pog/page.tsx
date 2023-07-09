import { UserConfigForm } from '@/component/feature/userConfig/UserConfigForm'
import { userConfigFormAction } from '@/component/feature/userConfig/UserConfigForm/action'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import { serverFetch } from '@/page/_src/api'

async function initialize() {
  const { user } = await serverFetch<GetSelf>('/auth/self')
  if (!user) {
    return { name: '', uid: '', picture: '' }
  }
  return user
}

const Config = async () => {
  const { name, picture, uid } = await initialize()

  return (
    <Animation>
      <CenterBox>
        <UserConfigForm
          defaultValues={{ name, picture }}
          uid={uid}
          onSubmit={userConfigFormAction}
        />
      </CenterBox>
    </Animation>
  )
}

export default Config
