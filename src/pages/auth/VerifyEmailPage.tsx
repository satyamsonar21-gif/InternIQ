import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2, ArrowLeft, Check } from 'lucide-react'

export default function VerifyEmailPage() {
  const [isVerified, setIsVerified] = useState(false)
  const [resendToast, setResendToast] = useState(false)
  const navigate = useNavigate()

  // Auto-verification simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerified(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleResend = () => {
    setResendToast(true)
    setTimeout(() => setResendToast(false), 2500)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Toast */}
      <AnimatePresence>
        {resendToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-12 z-50 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Check className="w-4 h-4 text-emerald-400" /> Verification link resent to your email!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl z-10 text-center"
      >
        <div className="relative mx-auto w-20 h-20 mb-6">
          {!isVerified ? (
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center border border-slate-200"
            >
              <Mail className="w-10 h-10 text-slate-800" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-full h-full bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </motion.div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {isVerified ? 'Email Verified!' : 'Verify your email'}
        </h1>

        <p className="text-slate-500 text-xs font-medium mb-8">
          {isVerified
            ? 'Your email has been successfully verified. You can now access your dashboard.'
            : "We've sent a verification email to your inbox. Please click the link to verify your account."}
        </p>

        {isVerified ? (
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl shadow-sm text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all"
          >
            Continue to Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleResend}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 transition-all shadow-xs"
            >
              Resend Verification Email
            </button>
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mr-2" />
              <span className="text-xs text-slate-500 font-medium">Waiting for verification...</span>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200">
          <Link to="/login" className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
