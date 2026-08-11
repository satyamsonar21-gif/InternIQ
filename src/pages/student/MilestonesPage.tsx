import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  AlertTriangle,
  Paperclip,
  Send,
  X,
  AlignLeft,
  ListTodo,
  History,
  CheckSquare,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
type Status = 'Not Started' | 'In Progress' | 'Submitted' | 'Verified'
type AssignedBy = 'Industry' | 'Faculty'

interface Deliverable {
  id: string
  title: string
  completed: boolean
}

interface Task {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  assignedBy: AssignedBy
  assigneeName: string
  dueDate: string
  deliverables: Deliverable[]
  feedback?: { date: string; author: string; comment: string }[]
}

const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Initial Architecture Review',
    description: 'Review the proposed microservices architecture and submit feedback focusing on scalability and security considerations for the new payment gateway.',
    status: 'Verified',
    priority: 'Critical',
    assignedBy: 'Industry',
    assigneeName: 'Rahul K.',
    dueDate: '2026-07-20T23:59:00Z',
    deliverables: [
      { id: 'd1', title: 'Read architecture doc', completed: true },
      { id: 'd2', title: 'Draft review notes', completed: true },
      { id: 'd3', title: 'Submit final feedback', completed: true },
    ],
    feedback: [
      { date: '2026-07-19T10:00:00Z', author: 'Rahul K.', comment: 'Great insights on the security aspects. Verified.' },
    ],
  },
  {
    id: 't2',
    title: 'Implement OAuth2 Flow',
    description: 'Integrate Google and GitHub OAuth2 authentication into the staging environment. Ensure proper token handling and error states.',
    status: 'Submitted',
    priority: 'High',
    assignedBy: 'Industry',
    assigneeName: 'Rahul K.',
    dueDate: '2026-07-25T23:59:00Z',
    deliverables: [
      { id: 'd4', title: 'Setup OAuth apps', completed: true },
      { id: 'd5', title: 'Implement frontend login buttons', completed: true },
      { id: 'd6', title: 'Backend token verification', completed: true },
      { id: 'd7', title: 'Write integration tests', completed: true },
    ],
    feedback: [
      { date: '2026-07-24T15:30:00Z', author: 'System', comment: 'Work submitted for review.' },
    ],
  },
  {
    id: 't3',
    title: 'Mid-Term Evaluation Report',
    description: 'Compile a comprehensive report of all tasks completed so far and learnings aligned with the curriculum objectives.',
    status: 'In Progress',
    priority: 'High',
    assignedBy: 'Faculty',
    assigneeName: 'Dr. Priya',
    dueDate: '2026-08-30T17:00:00Z',
    deliverables: [
      { id: 'd8', title: 'Summarize industry tasks', completed: true },
      { id: 'd9', title: 'Map to course objectives', completed: false },
      { id: 'd10', title: 'Format report', completed: false },
    ],
  },
  {
    id: 't4',
    title: 'Database Schema Optimization',
    description: 'Analyze query performance on the main users table and propose indexing strategies or schema changes.',
    status: 'Not Started',
    priority: 'Medium',
    assignedBy: 'Industry',
    assigneeName: 'Rahul K.',
    dueDate: '2026-09-05T23:59:00Z',
    deliverables: [
      { id: 'd11', title: 'Extract slow queries', completed: false },
      { id: 'd12', title: 'Propose new indexes', completed: false },
    ],
  },
]

const getPriorityBadge = (priority: Priority) => {
  switch (priority) {
    case 'Critical':
      return 'bg-rose-100 text-rose-800 border-rose-300'
    case 'High':
      return 'bg-amber-100 text-amber-800 border-amber-300'
    case 'Medium':
      return 'bg-[#F97316]/10 text-[#EA580C] border-[#F97316]/30'
    case 'Low':
      return 'bg-slate-100 text-slate-700 border-slate-300'
  }
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`
  if (diffDays === 0) return 'Due today'
  if (diffDays === 1) return 'Due tomorrow'
  return `Due in ${diffDays} days`
}

const isOverdue = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  return date.getTime() < now.getTime()
}

export default function MilestonesPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [filterAssigned, setFilterAssigned] = useState<'All' | 'Industry' | 'Faculty'>('All')
  const [filterPriority, setFilterPriority] = useState<'All' | Priority>('All')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [submissionText, setSubmissionText] = useState('')
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchAssigned = filterAssigned === 'All' || task.assignedBy === filterAssigned
      const matchPriority = filterPriority === 'All' || task.priority === filterPriority
      return matchAssigned && matchPriority
    })
  }, [tasks, filterAssigned, filterPriority])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === 'Verified').length
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length
    const submitted = tasks.filter((t) => t.status === 'Submitted').length
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, inProgress, submitted, completionRate }
  }, [tasks])

  const upcomingTask = useMemo(() => {
    return tasks
      .filter((t) => t.status !== 'Verified' && t.status !== 'Submitted')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0]
  }, [tasks])

  const handleToggleDeliverable = (taskId: string, deliverableId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedDeliverables = t.deliverables.map((d) =>
            d.id === deliverableId ? { ...d, completed: !d.completed } : d
          )
          let newStatus = t.status
          const anyChecked = updatedDeliverables.some((d) => d.completed)
          if (t.status === 'Not Started' && anyChecked) {
            newStatus = 'In Progress'
          }
          const updatedTask = { ...t, deliverables: updatedDeliverables, status: newStatus }
          if (selectedTask?.id === taskId) setSelectedTask(updatedTask)
          return updatedTask
        }
        return t
      })
    )
  }

  const handleSubmitWork = () => {
    if (!selectedTask) return

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === selectedTask.id) {
          const updatedFeedback = [
            ...(t.feedback || []),
            {
              date: new Date().toISOString(),
              author: 'Student (You)',
              comment: submissionText || `Submitted milestone work. ${attachedFileName ? `[Attachment: ${attachedFileName}]` : ''}`,
            },
          ]
          const updatedTask = { ...t, status: 'Submitted' as Status, feedback: updatedFeedback }
          setSelectedTask(updatedTask)
          return updatedTask
        }
        return t
      })
    )

    setSubmissionText('')
    setAttachedFileName(null)
    triggerToast('Milestone work submitted for review!')
  }

  const COLUMNS: { id: Status; title: string; color: string }[] = [
    { id: 'Not Started', title: 'Not Started', color: 'bg-slate-400' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-[#F97316]' },
    { id: 'Submitted', title: 'Submitted', color: 'bg-[#EA580C]' },
    { id: 'Verified', title: 'Verified', color: 'bg-emerald-600' },
  ]

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-[#F97316] text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-[#431407]">Tasks & Milestones</h1>
          <p className="text-xs text-[#9A3412] font-medium">Track your internship progress, manage assignments, and submit deliverables.</p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex bg-white rounded-xl p-1 border border-[#FED7AA]">
              {(['All', 'Industry', 'Faculty'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterAssigned(tab)}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-xs font-bold transition-colors',
                    filterAssigned === tab ? 'bg-[#F97316] text-white shadow-xs' : 'text-[#9A3412] hover:text-[#431407]'
                  )}
                >
                  {tab === 'All' ? 'All Tasks' : `${tab} Assigned`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-1.5 border border-[#FED7AA]">
              <Filter className="w-4 h-4 text-[#9A3412]" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
                className="bg-transparent border-none text-xs font-bold text-[#431407] focus:outline-none"
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#FED7AA] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-xs text-[#431407]">Overall Progress</h3>
              <span className="text-2xl font-bold text-[#F97316] font-mono">{stats.completionRate}%</span>
            </div>
            <div className="h-2.5 w-full bg-[#FFF7ED] rounded-full overflow-hidden mb-4 border border-[#FED7AA]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.completionRate}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-[#F97316] rounded-full"
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#9A3412] font-semibold">
              <span>{stats.total} Total</span>
              <span>{stats.completed} Verified</span>
              <span>{stats.inProgress} In Progress</span>
            </div>
          </div>

          {upcomingTask && (
            <div className="mt-4 pt-4 border-t border-[#FED7AA] flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#9A3412] font-bold uppercase">Upcoming Deadline</p>
                <p className="text-xs font-bold text-[#431407] truncate max-w-[180px]">{upcomingTask.title}</p>
                <p className={cn('text-[11px] font-semibold mt-0.5', isOverdue(upcomingTask.dueDate) ? 'text-rose-600' : 'text-amber-700')}>
                  {formatRelativeTime(upcomingTask.dueDate)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
        {COLUMNS.map((column) => {
          const columnTasks = filteredTasks.filter((t) => t.status === column.id)
          return (
            <div key={column.id} className="min-w-[320px] w-[320px] flex-shrink-0 flex flex-col snap-start">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className={cn('w-2.5 h-2.5 rounded-full', column.color)} />
                  <h2 className="font-bold text-xs text-[#431407] uppercase tracking-wider">{column.title}</h2>
                </div>
                <span className="bg-white text-[#9A3412] text-xs font-bold py-0.5 px-2 rounded-full border border-[#FED7AA]">
                  {columnTasks.length}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <AnimatePresence>
                  {columnTasks.map((task) => {
                    const completedDeliverables = task.deliverables.filter((d) => d.completed).length
                    const totalDeliverables = task.deliverables.length
                    const deliverableRatio = totalDeliverables > 0 ? completedDeliverables / totalDeliverables : 0

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className="bg-white p-5 rounded-2xl border border-[#FED7AA] hover:border-[#F97316] cursor-pointer transition-all shadow-xs group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border', getPriorityBadge(task.priority))}>
                            {task.priority}
                          </span>
                          <span className="text-[10px] font-bold text-[#EA580C] bg-[#FFF7ED] px-2 py-0.5 rounded border border-[#FED7AA]">
                            {task.assignedBy}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-[#431407] mb-1 group-hover:text-[#F97316] transition-colors">{task.title}</h3>
                        <p className="text-xs text-[#9A3412] line-clamp-2 mb-4 leading-relaxed font-medium">{task.description}</p>

                        {totalDeliverables > 0 && (
                          <div className="mb-4">
                            <div className="flex justify-between text-[11px] font-semibold text-[#9A3412] mb-1">
                              <span className="flex items-center gap-1"><CheckSquare className="w-3 h-3 text-[#F97316]" /> Deliverables</span>
                              <span>{completedDeliverables}/{totalDeliverables}</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#FFF7ED] rounded-full overflow-hidden border border-[#FED7AA]">
                              <div
                                className={cn('h-full rounded-full transition-all duration-500', deliverableRatio === 1 ? 'bg-emerald-500' : 'bg-[#F97316]')}
                                style={{ width: `${deliverableRatio * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#FED7AA]">
                          <div className="flex items-center gap-1.5 text-xs text-[#9A3412] font-semibold">
                            <div className="w-5 h-5 rounded-full bg-[#F97316] text-white flex items-center justify-center text-[10px] font-bold">
                              {task.assigneeName.charAt(0)}
                            </div>
                            <span className="truncate max-w-[80px]">{task.assigneeName}</span>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-[#9A3412] font-medium">
                            <Clock className="w-3 h-3 text-[#F97316]" />
                            <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                {columnTasks.length === 0 && (
                  <div className="border border-dashed border-[#FED7AA] rounded-2xl p-8 flex flex-col items-center justify-center text-center text-[#9A3412] font-medium h-32 bg-white">
                    <p className="text-xs">No tasks here</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTask(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40" />

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 m-auto w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#FED7AA] z-50 flex flex-col overflow-hidden">
              <div className="p-6 border-b border-[#FED7AA] bg-[#FFF7ED] flex justify-between items-start">
                <div className="space-y-2 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border', getPriorityBadge(selectedTask.priority))}>
                      {selectedTask.priority}
                    </span>
                    <span className="text-xs text-[#EA580C] bg-white px-2 py-0.5 rounded-full border border-[#FED7AA] font-bold">
                      {selectedTask.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#431407] leading-tight">{selectedTask.title}</h2>
                  <p className="text-xs text-[#9A3412] font-medium">Assigned by: <strong>{selectedTask.assigneeName}</strong> ({selectedTask.assignedBy})</p>
                </div>

                <button onClick={() => setSelectedTask(null)} className="p-2 text-[#9A3412] hover:text-[#431407] hover:bg-white rounded-full"><X className="w-5 h-5" /></button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-bold text-[#431407] mb-2 uppercase tracking-wider"><AlignLeft className="w-4 h-4 text-[#F97316]" /> Description</h3>
                  <div className="bg-[#FFF7ED] p-4 rounded-xl border border-[#FED7AA] text-[#431407] text-xs leading-relaxed font-medium">
                    {selectedTask.description}
                  </div>
                </div>

                {selectedTask.deliverables.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold text-[#431407] mb-2 uppercase tracking-wider"><ListTodo className="w-4 h-4 text-[#F97316]" /> Deliverables Checklist</h3>
                    <div className="space-y-2">
                      {selectedTask.deliverables.map((d) => (
                        <div key={d.id} onClick={() => handleToggleDeliverable(selectedTask.id, d.id)} className={cn('flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all', d.completed ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' : 'bg-[#FFF7ED] border-[#FED7AA] text-[#431407]')}>
                          {d.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <Circle className="w-5 h-5 text-[#9A3412] shrink-0" />}
                          <span className={cn('text-xs font-medium', d.completed && 'line-through text-slate-500')}>{d.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTask.feedback && selectedTask.feedback.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold text-[#431407] mb-2 uppercase tracking-wider"><History className="w-4 h-4 text-[#F97316]" /> Activity & Feedback</h3>
                    <div className="space-y-3">
                      {selectedTask.feedback.map((item, idx) => (
                        <div key={idx} className="bg-[#FFF7ED] p-3 rounded-xl border border-[#FED7AA]">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-[#431407]">{item.author}</span>
                            <span className="text-[10px] text-[#9A3412] font-mono">{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-[#9A3412] font-medium">"{item.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedTask.status === 'In Progress' || selectedTask.status === 'Not Started') && (
                  <div className="bg-[#FFF7ED] border border-[#FED7AA] p-5 rounded-2xl space-y-4 mt-6">
                    <h3 className="text-xs font-bold text-[#431407] uppercase tracking-wider flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#F97316]" /> Submit Milestone Work
                    </h3>
                    <textarea value={submissionText} onChange={(e) => setSubmissionText(e.target.value)} placeholder="Add notes, links to PRs, or description of completed work..." className="w-full bg-white border border-[#FED7AA] rounded-xl p-3 text-xs text-[#431407] focus:outline-none focus:border-[#F97316] min-h-[90px]" />
                    <div className="flex justify-between items-center">
                      <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setAttachedFileName(e.target.files?.[0]?.name || null)} />
                      <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 text-xs text-[#9A3412] hover:text-[#431407] font-bold">
                        <Paperclip className="w-4 h-4 text-[#F97316]" /> {attachedFileName || 'Attach Files'}
                      </button>
                      <button onClick={handleSubmitWork} className="bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors flex items-center gap-2 shadow-xs">
                        Submit for Review <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
