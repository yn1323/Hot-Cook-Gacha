import { Fragment, Suspense } from 'react'
import { RecentGachaHistory } from '@/components/feature/gacha/RecentGachaHistory'
import {
  Header as RecentGachaHeader,
  Header as RecentRecipesHeader,
} from '@/components/feature/gacha/RecentGachaHistory/Header'
import { RecentRecipes } from '@/components/feature/recipe/RecentRecipes'
import { Animation } from '@/components/layout/Animation'
import { PartLoading } from '@/components/layout/PartLoading'

const Dashboard = () => {
  return (
    <Animation>
      <Suspense
        fallback={
          <Fragment>
            <RecentRecipesHeader />
            <PartLoading />
          </Fragment>
        }
      >
        <RecentRecipes />
      </Suspense>
      <Suspense
        fallback={
          <Fragment>
            <RecentGachaHeader />
            <PartLoading />
          </Fragment>
        }
      >
        <RecentGachaHistory />
      </Suspense>
    </Animation>
  )
}

export default Dashboard
