'use client'

import { JSX, ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type MobileDrawerProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function MobileDrawer({ open, onClose, children }: MobileDrawerProps): JSX.Element {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return (): void => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="md:hidden">
      <AnimatePresence>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className={open ? 'fixed inset-0 z-50 bg-2c3338 bg-opacity-30 backdrop-blur-sm' : 'pointer-events-none'}
          onClick={onClose}
        >
          <motion.div
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: open ? 0 : '-100%' }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e): void => e.stopPropagation()}
            className="absolute pb-5 inset-y-0 left-0 w-full max-w-sm bg-[#1C1C1E] shadow-lg overflow-hidden"
          >
            <div className="flex justify-end mb-4">
              <button onClick={onClose} aria-label="Close menu" className="text-gray-500 hover:text-black transition">
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
