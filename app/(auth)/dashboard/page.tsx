import { Suspense } from 'react'
import { RecentRecipes } from '@/component/feature/recipe/RecentRecipes'
import { Animation } from '@/component/layout/Animation'

const Dashboard = () => {
  return (
    <Animation>
      <Suspense fallback={<div>loading...</div>}>
        <RecentRecipes />
      </Suspense>
    </Animation>
  )
}

export default Dashboard
