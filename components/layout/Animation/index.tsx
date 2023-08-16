'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

type PropTypes = {
  children: JSX.Element | JSX.Element[]
}

export const Animation: FC<PropTypes> = ({ children }) => {
  const childComponents = Array.isArray(children) ? children : [children]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.1 }}
    >
      {childComponents}
    </motion.div>
  )
}
