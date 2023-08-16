import { Suspense } from 'react'
import { PageLoading } from '@/components/layout/PageLoading'
import { SpMenu } from '@/components/layout/SpMenu'
import { Initialize } from '@/components/layout/wrapper/Initialize'

const AuthTemplate = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Initialize>
        <SpMenu>{children}</SpMenu>
      </Initialize>
    </Suspense>
  )
}

export default AuthTemplate
