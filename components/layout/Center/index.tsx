'use client'

import { Divider, VStack } from '@chakra-ui/react'
import { Fragment, ReactNode } from 'react'

type Props = {
  children: ReactNode | ReactNode[]
  gap?: number
  divider?: boolean
}

export const Center = ({ children, gap = 4, divider = false }: Props) => {
  const childComponents = Array.isArray(children) ? children : [children]

  return (
    <VStack gap={gap} w="100%">
      {childComponents.length <= 1
        ? childComponents
        : childComponents.map((child, i) => (
            <Fragment key={i}>
              {child}

              {i !== childComponents.length - 1 && divider && (
                <Divider mt={gap} />
              )}
            </Fragment>
          ))}
    </VStack>
  )
}
