
import { Complete as CompleteNotification } from '@/component/feature/notifications/Complete'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'

const Complete = async () => {
  return (
    <Animation>
      <CenterBox>
            <CompleteNotification/>
      </CenterBox>
    </Animation>
  )
}

export default Complete
