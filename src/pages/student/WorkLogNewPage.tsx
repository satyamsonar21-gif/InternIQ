import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Bold,
  Italic,
  Code,
  List,
  Link as LinkIcon,
  Upload,
  X,
  File as FileIcon,
  Loader2,
  Calendar,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type LogType = 'daily' | 'weekly'
const AVAILABLE_TAGS = ['Frontend', 'API-Integration', 'Database', 'UI-Design', 'Testing', 'Documentation']

export default function WorkLogNewPage() {
  const navigate = useNavigate()

  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [logType, setLogType] = useState<LogType>('daily')
  const [hours, setHours] = useState('8.0')
  const [selectedTags, setSelectedTags] = useState<string[]>(['Frontend'])
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDrafting, setIsDrafting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      const validFiles = droppedFiles.filter(
        (f) => f.size <= 10 * 1024 * 1024 && ['application/pdf', 'image/png', 'image/jpeg'].includes(f.type)
      )
      setFiles((prev) => [...prev, ...validFiles])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      const validFiles = selectedFiles.filter((f) => f.size <= 10 * 1024 * 1024)
      setFiles((prev) => [...prev, ...validFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFormat = (command: string) => {
    const textarea = document.getElementById('description-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value

    let wrappedText = ''
    switch (command) {
      case 'bold':
        wrappedText = `**${text.substring(start, end)}**`
        break
      case 'italic':
        wrappedText = `*${text.substring(start, end)}*`
        break
      case 'code':
        wrappedText = `\`${text.substring(start, end)}\``
        break
      case 'list':
        wrappedText = `\n- ${text.substring(start, end)}`
        break
      case 'link':
        wrappedText = `[${text.substring(start, end)}](url)`
        break
      default:
        return
    }

    const newText = text.substring(0, start) + wrappedText + text.substring(end)
    setDescription(newText)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + wrappedText.length, start + wrappedText.length)
    }, 0)
  }

  const simulateSubmit = (isDraft: boolean) => {
    if (isDraft) setIsDrafting(true)
    else setIsSubmitting(true)

    // Construct new log object & save to localStorage
    const newLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      date,
      type: logType === 'daily' ? 'Daily' : 'Weekly',
      hours: parseFloat(hours) || 8.0,
      tags: selectedTags.length > 0 ? selectedTags : ['Frontend'],
      status: isDraft ? 'draft' : 'submitted',
      description: description || 'Work log details submitted.',
      attachments: files.map((f) => ({ name: f.name, size: `${(f.size / (1024 * 1024)).toFixed(1)} MB` })),
      feedback: null,
    }

    const existingCustom = JSON.parse(localStorage.getItem('interniq_custom_work_logs') || '[]')
    localStorage.setItem('interniq_custom_work_logs', JSON.stringify([newLog, ...existingCustom]))

    setTimeout(() => {
      if (isDraft) setIsDrafting(false)
      else setIsSubmitting(false)

      setToastMessage(isDraft ? 'Draft saved successfully' : 'Work log submitted successfully')
      setShowToast(true)

      setTimeout(() => {
        setShowToast(false)
        navigate('/student/logs')
      }, 1200)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#10B981] text-white px-6 py-3 rounded-xl shadow-lg font-bold text-xs flex items-center space-x-2"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link
            to="/student/logs"
            className="p-2 hover:bg-[#FFF7ED] border border-transparent hover:border-[#FED7AA] rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#9A3412]" />
          </Link>
          <h1 className="text-2xl font-bold text-[#431407] tracking-tight">Submit Work Log</h1>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-[#FED7AA] rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#431407]">Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-4 py-2.5 text-xs text-[#431407] focus:outline-none focus:border-[#F97316] transition-all pl-11 font-medium"
                />
                <Calendar className="w-5 h-5 text-[#F97316] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Log Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#431407]">Log Type</label>
              <div className="flex p-1 bg-[#FFF7ED] rounded-xl border border-[#FED7AA]">
                <button
                  onClick={() => setLogType('daily')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all',
                    logType === 'daily' ? 'bg-[#F97316] text-white shadow-xs' : 'text-[#9A3412] hover:text-[#431407]'
                  )}
                >
                  Daily Log
                </button>
                <button
                  onClick={() => setLogType('weekly')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all',
                    logType === 'weekly' ? 'bg-[#F97316] text-white shadow-xs' : 'text-[#9A3412] hover:text-[#431407]'
                  )}
                >
                  Weekly Summary
                </button>
              </div>
            </div>

            {/* Hours Worked */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-[#431407]">Hours Worked</label>
              <div className="relative w-full md:w-1/2">
                <input
                  type="number"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-4 py-2.5 pl-11 text-xs font-bold text-[#431407] focus:outline-none focus:border-[#F97316] transition-all"
                />
                <Clock className="w-5 h-5 text-[#F97316] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Task Tags */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-xs font-bold text-[#431407]">Task Tags</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200',
                      selectedTags.includes(tag)
                        ? 'bg-[#F97316] border-[#F97316] text-white'
                        : 'bg-[#FFF7ED] border-[#FED7AA] text-[#9A3412] hover:border-[#F97316]'
                    )}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#431407]">Description</label>
                <span className="text-[10px] text-[#9A3412] font-mono">{description.length}/2000</span>
              </div>

              <div className="border border-[#FED7AA] rounded-xl overflow-hidden bg-[#FFF7ED] focus-within:border-[#F97316] transition-all">
                {/* Formatting Toolbar */}
                <div className="flex items-center p-2 border-b border-[#FED7AA] bg-white gap-1">
                  <button onClick={() => handleFormat('bold')} className="p-1.5 text-[#9A3412] hover:text-[#431407] hover:bg-[#FFF7ED] rounded-md transition-colors"><Bold className="w-4 h-4" /></button>
                  <button onClick={() => handleFormat('italic')} className="p-1.5 text-[#9A3412] hover:text-[#431407] hover:bg-[#FFF7ED] rounded-md transition-colors"><Italic className="w-4 h-4" /></button>
                  <div className="w-px h-4 bg-[#FED7AA] mx-1"></div>
                  <button onClick={() => handleFormat('code')} className="p-1.5 text-[#9A3412] hover:text-[#431407] hover:bg-[#FFF7ED] rounded-md transition-colors"><Code className="w-4 h-4" /></button>
                  <button onClick={() => handleFormat('list')} className="p-1.5 text-[#9A3412] hover:text-[#431407] hover:bg-[#FFF7ED] rounded-md transition-colors"><List className="w-4 h-4" /></button>
                  <div className="w-px h-4 bg-[#FED7AA] mx-1"></div>
                  <button onClick={() => handleFormat('link')} className="p-1.5 text-[#9A3412] hover:text-[#431407] hover:bg-[#FFF7ED] rounded-md transition-colors"><LinkIcon className="w-4 h-4" /></button>
                </div>
                <textarea
                  id="description-editor"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your work, achievements, and challenges..."
                  className="w-full h-40 bg-transparent p-4 text-xs text-[#431407] focus:outline-none resize-none font-medium"
                  maxLength={2000}
                />
              </div>
            </div>

            {/* File Attachment Uploader */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-[#431407]">Attachments</label>

              <div
                className="border-2 border-dashed border-[#FED7AA] rounded-xl p-6 text-center bg-[#FFF7ED] hover:border-[#F97316] transition-all cursor-pointer group"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto mb-2 text-[#F97316] shadow-xs">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-[#431407] mb-0.5">Click to upload or drag and drop</p>
                <p className="text-[10px] text-[#9A3412]">PDF, PNG, JPG (max 10MB)</p>
              </div>

              {/* Uploaded Files Preview */}
              {files.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#FFF7ED] border border-[#FED7AA]">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="p-2 bg-white rounded-lg text-[#F97316]">
                          <FileIcon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-[#431407] truncate">{file.name}</p>
                          <p className="text-[10px] text-[#9A3412]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(idx)}
                        className="p-1.5 text-[#9A3412] hover:text-[#EF4444] hover:bg-rose-50 rounded-md transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#FED7AA] flex items-center justify-end space-x-4">
            <button
              onClick={() => simulateSubmit(true)}
              disabled={isSubmitting || isDrafting}
              className="px-5 py-2.5 text-xs font-bold text-[#9A3412] hover:text-[#431407] hover:bg-[#FFF7ED] rounded-xl transition-all disabled:opacity-50 flex items-center"
            >
              {isDrafting && <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#F97316]" />}
              Save as Draft
            </button>
            <button
              onClick={() => simulateSubmit(false)}
              disabled={isSubmitting || isDrafting}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-md shadow-[#F97316]/20 transition-all disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                  Submitting...
                </>
              ) : (
                'Submit Log'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
