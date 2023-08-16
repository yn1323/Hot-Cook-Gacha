import { compareDesc, parseISO } from 'date-fns'
import { Fragment } from 'react'
import { GachaHistory } from '@/components/feature/gacha/RecentGachaHistory/GachaHistory'
import { Header } from '@/components/feature/gacha/RecentGachaHistory/Header'
import { GetGachaHistory } from '@/page/(auth)/gacha/api/history/route'
import { serverFetch } from '@/src/api/fetch'
import { RevalidateTags } from '@/src/api/tags'

async function initialize() {
  const { gachaHistories } = await serverFetch<GetGachaHistory>(
    `/gacha/api/history`,
    {
      next: {
        tags: [RevalidateTags.gacha],
      },
    }
  )

  return {
    gachaHistories,
  }
}

type Props = {}

export const RecentGachaHistory = async ({}: Props) => {
  const { gachaHistories } = await initialize()

  const sortedData = gachaHistories.sort((a, b) => {
    return compareDesc(parseISO(a.dateCreated), parseISO(b.dateCreated))
  })

  return (
    <Fragment>
      <Header />
      <GachaHistory gachaHistories={sortedData} />
    </Fragment>
  )
}
