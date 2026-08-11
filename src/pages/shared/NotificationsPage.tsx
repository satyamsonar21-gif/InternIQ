import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check, Trash2, CheckCircle2, AlertCircle, Clock, MessageSquare, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type Notification = {
  id: string
  title: string
  message: string
  time: string
  type: 'alert' | 'success' | 'info' | 'message'
  unread: boolean
  category: 'System Alerts' | 'Mentor Activity' | 'Deadlines' | 'Other'
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All')

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Mid-term Report Due', message: 'Your mid-term evaluation report is due in 3 days. Please submit it via the portal.', time: '2 hours ago', type: 'alert', unread: true, category: 'Deadlines' },
    { id: '2', title: 'Task Approved', message: 'Industry mentor Alex Johnson approved your work log for Week 4.', time: '5 hours ago', type: 'success', unread: true, category: 'Mentor Activity' },
    { id: '3', title: 'System Maintenance', message: 'InternIQ will be down for scheduled maintenance on Sunday 2AM-4AM EST.', time: '1 day ago', type: 'info', unread: false, category: 'System Alerts' },
    { id: '4', title: 'New Message', message: 'Prof. Smith left a comment on your recent project submission.', time: '1 day ago', type: 'message', unread: false, category: 'Mentor Activity' },
    { id: '5', title: 'Weekly Log Reminder', message: "Don't forget to submit your weekly work log by Friday EOD.", time: '2 days ago', type: 'alert', unread: false, category: 'Deadlines' },
    { id: '6', title: 'Profile Updated', message: 'Your contact information was successfully updated.', time: '3 days ago', type: 'success', unread: false, category: 'System Alerts' },
  ])

  const tabs = ['All', 'Unread', 'System Alerts', 'Mentor Activity', 'Deadlines']

  const filteredNotifs = notifications.filter((n) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Unread') return n.unread
    return n.category === activeTab
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-amber-500" />
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />
      case 'message':
        return <MessageSquare className="w-5 h-5 text-[#06B6D4]" />
      default:
        return <Info className="w-5 h-5 text-slate-800" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Bell className="w-7 h-7 text-slate-900" /> Notifications
          </h1>
          <p className="text-xs text-slate-500 font-medium">Stay updated with your internship activities and system alerts.</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 rounded-xl border border-slate-300 transition-colors text-xs font-bold shadow-xs"
        >
          <Check className="w-4 h-4 text-emerald-600" /> Mark All as Read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-white p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 text-xs font-bold whitespace-nowrap rounded-lg transition-all',
              activeTab === tab ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredNotifs.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 bg-white border border-slate-200 rounded-2xl">
              <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-medium">No notifications found in this category.</p>
            </motion.div>
          ) : (
            filteredNotifs.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'bg-white border rounded-2xl p-4 flex gap-4 transition-all group shadow-xs',
                  notif.unread ? 'border-slate-900 bg-slate-50/50' : 'border-slate-200'
                )}
              >
                <div className="mt-1 bg-white p-2 rounded-xl border border-slate-200 h-fit shadow-xs">{getIcon(notif.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className={cn('font-bold text-xs', notif.unread ? 'text-slate-900' : 'text-slate-700')}>{notif.title}</h3>
                    <div className="flex items-center gap-2">
                      {notif.unread && (
                        <button onClick={() => markAsRead(notif.id)} className="p-1 text-slate-400 hover:text-emerald-600" title="Mark as read">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => deleteNotif(notif.id)} className="p-1 text-slate-400 hover:text-rose-600" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed font-medium">{notif.message}</p>
                  <div className="flex items-center gap-2 mt-3 text-[10px] font-semibold text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{notif.time}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{notif.category}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
