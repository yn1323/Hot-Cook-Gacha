import { Suspense } from 'react'
import { RecentGachaHistory } from '@/components/feature/gacha/RecentGachaHistory'
import { RecentRecipes } from '@/components/feature/recipe/RecentRecipes'
import { Animation } from '@/components/layout/Animation'

const Dashboard = () => {
  return (
    <Animation>
      <Suspense fallback={<div>loading...</div>}>
        <RecentRecipes />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <RecentGachaHistory />
      </Suspense>
    </Animation>
  )
}

export default Dashboard
