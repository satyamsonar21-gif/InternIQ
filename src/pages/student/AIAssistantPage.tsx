import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Send,
  Sparkles,
  User,
  Trash2,
  Database,
  Key,
  Copy,
  Check,
  Zap,
} from 'lucide-react'
import { askGemini36Flash, type GeminiResponse } from '@/lib/gemini'
import { useAuth } from '@/contexts/AuthContext'

interface ChatMessage {
  id: string
  sender: 'user' | 'ai'
  text: string
  timestamp: string
  citations?: Array<{ title: string; type: string }>
  modelUsed?: string
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: `### 👋 Welcome to InternIQ AI Assistant — Powered by Gemini 3.6 Flash!

I am your flagship AI Assistant built with deep intelligence across software development, internship lifecycle tracking, code reviews, placement readiness scoring, and technical interview preparation.

#### 💡 How I can assist you today:
- **Placement Readiness Analysis:** Calculate your PPO conversion likelihood & skill gap roadmap.
- **Code & System Architecture:** Debug React/TypeScript/Supabase code & generate production snippets.
- **Work Log & Feedback Critique:** Review mentor comments & draft weekly progress reports.
- **Technical Interview Prep:** Practice System Design, DSA, and React/Node interview questions.

*Select a prompt below or type any technical or career question!*`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    citations: [
      { title: 'Gemini 3.6 Flash Inference Core', type: 'AI Engine' },
      { title: 'InternIQ RAG Vector Database', type: 'Live Context' },
    ],
    modelUsed: 'Gemini 3.6 Flash (Active Engine)',
  },
]

const PROMPT_CHIPS = [
  'What is my placement readiness score?',
  'How to handle JWT auth in React & Supabase?',
  'Summarize my recent mentor feedback',
  'Give me resume bullet points for my internship',
  'Practice Frontend Interview Questions',
  'Draft my weekly work log summary',
]

export default function StudentAIAssistantPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputQuery, setInputQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [customApiKey, setCustomApiKey] = useState(localStorage.getItem('gemini_api_key') || '')
  const [keySavedToast, setKeySavedToast] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSaveApiKey = () => {
    if (customApiKey.trim()) {
      localStorage.setItem('gemini_api_key', customApiKey.trim())
    } else {
      localStorage.removeItem('gemini_api_key')
    }
    setKeySavedToast(true)
    setShowApiKeyInput(false)
    setTimeout(() => setKeySavedToast(false), 2000)
  }

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery
    if (!textToSend.trim() || isTyping) return

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!queryText) setInputQuery('')
    setIsTyping(true)

    try {
      const response: GeminiResponse = await askGemini36Flash(textToSend, {
        studentName: user?.full_name || 'Arjun Mehta',
        company: 'TechVista Solutions',
        role: 'Frontend Developer Intern',
        score: 78,
      })

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: response.citations,
        modelUsed: response.modelUsed,
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: '### ⚠️ Processing Note\n\nGemini 3.6 Flash encountered a temporary network issue. Please re-send your query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'Gemini 3.6 Flash Error Handler',
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES)
  }

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white border border-[#FED7AA] rounded-2xl shadow-xl overflow-hidden relative">
      {/* Top Bar Header */}
      <div className="px-6 py-4 border-b border-[#FED7AA] flex items-center justify-between bg-[#FFF7ED]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center text-white shadow-md shadow-[#F97316]/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-[#431407]">InternIQ AI Assistant</h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#F97316]/10 text-[#EA580C] border border-[#F97316]/30">
                <Sparkles className="w-3 h-3 text-[#F97316]" /> Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-[10px] text-[#9A3412] font-mono">
              Ultra-Strong Reasoning Engine • Context: {user?.full_name || 'Arjun Mehta'} (TechVista Solutions)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="p-2 text-[#9A3412] hover:text-[#EA580C] hover:bg-[#F97316]/10 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Configure Gemini API Key"
          >
            <Key className="w-4 h-4 text-[#F97316]" />
            <span className="hidden sm:inline">API Settings</span>
          </button>

          <button
            onClick={handleClear}
            className="p-2 text-[#9A3412] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded-xl transition-all"
            title="Clear Conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* API Key Settings Drawer */}
      <AnimatePresence>
        {showApiKeyInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 py-3 bg-[#FFF7ED] border-b border-[#FED7AA] flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2 flex-1">
              <Key className="w-4 h-4 text-[#F97316]" />
              <input
                type="password"
                placeholder="Paste optional Gemini API Key (AIzaSy...)"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="flex-1 h-9 bg-white border border-[#FED7AA] rounded-xl px-3 text-xs text-[#431407] focus:border-[#F97316]"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveApiKey}
                className="px-4 h-9 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl text-xs shadow-sm"
              >
                Save Key
              </button>
              <button
                onClick={() => setShowApiKeyInput(false)}
                className="px-3 h-9 border border-[#FED7AA] text-[#9A3412] hover:bg-white rounded-xl text-xs"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Key Toast */}
      <AnimatePresence>
        {keySavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-6 py-2 bg-[#10B981]/10 border-b border-[#10B981]/30 text-xs font-semibold text-[#047857] flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-[#10B981]" /> Gemini API Key settings updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#FAFAFA]">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-md ${
                msg.sender === 'user'
                  ? 'bg-[#F97316] text-white'
                  : 'bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble Container */}
            <div className={`max-w-2xl space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-5 rounded-2xl text-xs leading-relaxed font-sans shadow-md relative group ${
                  msg.sender === 'user'
                    ? 'bg-[#F97316] text-white rounded-tr-none font-medium'
                    : 'bg-white border border-[#FED7AA] text-[#431407] rounded-tl-none whitespace-pre-line'
                }`}
              >
                {/* Text Content */}
                <div>{msg.text}</div>

                {/* Copy Button for AI Messages */}
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopyText(msg.id, msg.text)}
                    className="absolute top-3 right-3 p-1.5 bg-[#FFF7ED] border border-[#FED7AA] rounded-lg text-[#9A3412] hover:text-[#431407] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy to clipboard"
                  >
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {/* Citations & Model Badge */}
              {msg.sender === 'ai' && (
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  {msg.modelUsed && (
                    <span className="text-[10px] font-mono text-[#EA580C] bg-[#F97316]/10 border border-[#F97316]/30 px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3" /> {msg.modelUsed}
                    </span>
                  )}

                  {msg.citations?.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-[#9A3412] bg-[#FFF7ED] border border-[#FED7AA] px-2 py-0.5 rounded-md"
                    >
                      <Database className="w-3 h-3 text-[#F97316]" /> {c.type}: {c.title}
                    </span>
                  ))}
                  <span className="text-[10px] text-[#9A3412]/70 font-mono ml-auto">{msg.timestamp}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F97316] flex items-center justify-center text-white text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-[#FED7AA] px-5 py-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
              <span className="text-xs font-semibold text-[#EA580C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#F97316]" /> Gemini 3.6 Flash is reasoning...
              </span>
              <div className="flex gap-1 ml-2">
                <div className="w-2 h-2 rounded-full bg-[#F97316] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#F97316] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#F97316] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-6 py-2.5 border-t border-[#FED7AA] bg-[#FFF7ED] flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] uppercase font-bold text-[#EA580C] tracking-wider flex items-center gap-1 whitespace-nowrap">
          <Sparkles className="w-3 h-3 text-[#F97316]" /> Gemini Chips:
        </span>
        {PROMPT_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="px-3 py-1 bg-white hover:bg-[#FFF7ED] border border-[#FED7AA] rounded-full text-xs text-[#9A3412] hover:text-[#431407] whitespace-nowrap transition-all flex items-center gap-1 shadow-sm font-medium"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-[#FED7AA] bg-white flex items-center gap-3">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Gemini 3.6 Flash anything (coding, placement score, code review, interview prep)..."
          className="flex-1 h-11 bg-[#FAFAFA] border border-[#FED7AA] rounded-xl px-4 text-xs text-[#431407] placeholder:text-[#9A3412]/50 focus:border-[#F97316] focus:bg-white transition-colors"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isTyping}
          className="h-11 px-6 bg-[#F97316] hover:bg-[#EA580C] rounded-xl text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-[#F97316]/20 transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
    </div>
  )
}
