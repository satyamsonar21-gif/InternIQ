import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, X, UploadCloud, Calendar, Tag, CheckSquare, Save, Send, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const MOCK_INTERNS = [
  { id: '1', name: 'Arjun Mehta' },
  { id: '2', name: 'Ananya Roy' },
  { id: '3', name: 'Rohan Sharma' },
]

export default function IndustryTaskNewPage() {
  const navigate = useNavigate()
  const [selectedInterns, setSelectedInterns] = useState<string[]>(['1'])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0])
  const [priority, setPriority] = useState('High')
  const [description, setDescription] = useState('')
  const [deliverables, setDeliverables] = useState<string[]>(['Setup repository and environment', 'Implement core UI module'])
  const [tags, setTags] = useState<string[]>(['#Frontend', '#React'])
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const toggleIntern = (id: string) => {
    setSelectedInterns((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleAddDeliverable = () => setDeliverables([...deliverables, ''])
  const handleRemoveDeliverable = (idx: number) => {
    if (deliverables.length > 1) {
      setDeliverables(deliverables.filter((_, i) => i !== idx))
    }
  }
  const updateDeliverable = (idx: number, val: string) => {
    const newDelivs = [...deliverables]
    newDelivs[idx] = val
    setDeliverables(newDelivs)
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      let newTag = tagInput.trim()
      if (!newTag.startsWith('#')) newTag = `#${newTag}`
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handlePublish = (isDraft: boolean) => {
    setIsSubmitting(true)
    setToastMessage(isDraft ? 'Task draft saved successfully!' : 'Task successfully dispatched to assigned interns!')
    setShowToast(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setShowToast(false)
      navigate('/industry/interns')
    }, 1200)
  }

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-[#701A75] text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/industry/interns')}
          className="p-2 hover:bg-white rounded-full transition-colors text-[#86198F] hover:text-[#4C0519]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#4C0519] tracking-tight">Assign New Task</h1>
          <p className="text-xs text-[#86198F] font-medium">Create and dispatch task deliverables to your interns</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-[#F5D0FE] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        {/* Intern Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#4C0519]">Assign To (Select interns)</label>
          <div className="flex flex-wrap gap-2">
            {MOCK_INTERNS.map((intern) => {
              const isSelected = selectedInterns.includes(intern.id)
              return (
                <button
                  key={intern.id}
                  type="button"
                  onClick={() => toggleIntern(intern.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border',
                    isSelected ? 'bg-[#701A75] text-white border-[#701A75] shadow-xs' : 'bg-[#FDF4FF] border-[#F5D0FE] text-[#86198F] hover:bg-white'
                  )}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  {intern.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-[#4C0519]">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Develop Dashboard Authentication Component"
              className="w-full bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl px-4 py-2.5 text-xs text-[#4C0519] placeholder:text-[#86198F]/50 focus:outline-none focus:border-[#701A75] font-medium"
            />
          </div>

          {/* Date & Priority */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#4C0519]">Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#701A75]" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-[#4C0519] focus:outline-none focus:border-[#701A75]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#4C0519]">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl px-4 py-2.5 text-xs font-bold text-[#4C0519] focus:outline-none focus:border-[#701A75]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#4C0519]">Description & Guidelines</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide clear technical instructions and objectives..."
            className="w-full bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl p-4 text-xs text-[#4C0519] placeholder:text-[#86198F]/50 focus:outline-none focus:border-[#701A75] font-medium"
          />
        </div>

        {/* Deliverables Checklist Builder */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#4C0519]">Deliverables Checklist</label>
            <button onClick={handleAddDeliverable} className="text-xs text-[#701A75] font-bold hover:underline flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add Item
            </button>
          </div>
          <div className="space-y-2">
            {deliverables.map((del, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={del}
                  onChange={(e) => updateDeliverable(idx, e.target.value)}
                  placeholder={`Deliverable ${idx + 1}...`}
                  className="flex-1 bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl px-4 py-2 text-xs text-[#4C0519] font-medium focus:outline-none focus:border-[#701A75]"
                />
                {deliverables.length > 1 && (
                  <button onClick={() => handleRemoveDeliverable(idx)} className="p-2 text-[#86198F] hover:text-rose-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skill Tags */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#4C0519]">Skill Tags</label>
          <div className="bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl p-2 flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 bg-[#701A75] text-white px-2.5 py-1 rounded-full text-xs font-bold">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-amber-200 ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <div className="flex-1 flex items-center gap-2 px-2">
              <Tag className="w-4 h-4 text-[#86198F]" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag and press Enter..."
                className="bg-transparent border-none focus:outline-none text-xs text-[#4C0519] w-full font-medium"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-[#F5D0FE]">
          <button onClick={() => handlePublish(true)} disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#F5D0FE] text-[#86198F] py-2.5 rounded-xl text-xs font-bold hover:bg-[#FDF4FF]">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button onClick={() => handlePublish(false)} disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 bg-[#701A75] hover:bg-[#86198F] text-white py-2.5 rounded-xl text-xs font-bold shadow-xs">
            <Send className="w-4 h-4" /> Dispatch Task
          </button>
        </div>
      </div>
    </div>
  )
}
