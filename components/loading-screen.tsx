"use client"

import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="mb-4"
        >
          <span className="text-3xl font-semibold tracking-wider text-primary"></span>SYNERGY HOMES
          <span className="block text-xs tracking-[0.3em] text-muted-foreground">LIMITED</span>
        </motion.div>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
              }}
              className="w-2 h-2 bg-primary"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
