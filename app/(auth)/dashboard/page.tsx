import { Suspense } from 'react'
import { RecentGachaHistory } from '@/component/feature/gacha/RecentGachaHistory'
import { RecentRecipes } from '@/component/feature/recipe/RecentRecipes'
import { Animation } from '@/component/layout/Animation'

const Dashboard = () => {
  return (
    <Animation>
      <Suspense fallback={<div>loading...</div>}>
        <RecentRecipes />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <RecentGachaHistory />
      </Suspense>
      <div style={{ marginBottom: '72px' }} />
    </Animation>
  )
}

export default Dashboard
