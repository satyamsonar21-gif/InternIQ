import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

interface ComingSoonProps {
  title: string
  description?: string
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-2xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center mb-6"
      >
        <Construction className="w-10 h-10 text-[#4F46E5]" />
      </motion.div>
      <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">{title}</h2>
      <p className="text-[#94A3B8] text-sm max-w-md">
        {description || 'This module is under development and will be available in the next phase.'}
      </p>
      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[#4F46E5]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
