import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  FileText,
  Image as ImageIcon,
  File,
  Search,
  Grid,
  List,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Eye,
  Download,
  Trash2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type DocumentCategory = 'Offer Letter' | 'Progress Reports' | 'Completion Certificate' | 'Work Samples' | 'Others'
type VerificationStatus = 'Verified' | 'Pending' | 'Rejected'
type FileType = 'pdf' | 'image' | 'doc'

interface Document {
  id: string
  name: string
  category: DocumentCategory
  fileType: FileType
  size: string
  uploadDate: string
  status: VerificationStatus
  ocrIndexed: boolean
  ocrSummary?: string
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    name: 'Google_Internship_Offer.pdf',
    category: 'Offer Letter',
    fileType: 'pdf',
    size: '1.2 MB',
    uploadDate: '2026-05-15',
    status: 'Verified',
    ocrIndexed: true,
    ocrSummary: 'Confirmed software engineering internship offer at Google, starting June 2026.',
  },
  {
    id: 'doc-2',
    name: 'Mid_Term_Report.pdf',
    category: 'Progress Reports',
    fileType: 'pdf',
    size: '2.4 MB',
    uploadDate: '2026-07-01',
    status: 'Verified',
    ocrIndexed: true,
    ocrSummary: 'Mid-term progress report detailing frontend development tasks completed.',
  },
  {
    id: 'doc-3',
    name: 'Dashboard_UI_Mockup.png',
    category: 'Work Samples',
    fileType: 'image',
    size: '4.8 MB',
    uploadDate: '2026-07-10',
    status: 'Pending',
    ocrIndexed: false,
  },
  {
    id: 'doc-4',
    name: 'Weekly_Log_Week1.docx',
    category: 'Progress Reports',
    fileType: 'doc',
    size: '0.8 MB',
    uploadDate: '2026-06-07',
    status: 'Verified',
    ocrIndexed: true,
    ocrSummary: 'Weekly log for week 1. Onboarding and environment setup.',
  },
  {
    id: 'doc-5',
    name: 'Completion_Certificate_Draft.pdf',
    category: 'Completion Certificate',
    fileType: 'pdf',
    size: '1.5 MB',
    uploadDate: '2026-07-20',
    status: 'Pending',
    ocrIndexed: true,
    ocrSummary: 'Draft completion certificate pending final institutional sign-off.',
  },
]

const CATEGORIES: { label: string; value: DocumentCategory | 'All Documents' }[] = [
  { label: 'All Documents', value: 'All Documents' },
  { label: 'Offer Letter', value: 'Offer Letter' },
  { label: 'Progress Reports', value: 'Progress Reports' },
  { label: 'Completion Certificate', value: 'Completion Certificate' },
  { label: 'Work Samples', value: 'Work Samples' },
  { label: 'Others', value: 'Others' },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS)
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | 'All Documents'>('All Documents')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Controlled Upload Form State
  const [uploadName, setUploadName] = useState('')
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory>('Progress Reports')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Zoom & Rotation State
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotation, setRotation] = useState(0)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = activeCategory === 'All Documents' || doc.category === activeCategory
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter((doc) => doc.id !== id))
      triggerToast('Document deleted')
    }
  }

  const handleDownload = (name: string) => {
    triggerToast(`Downloaded ${name}`)
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fileName = selectedFile ? selectedFile.name : uploadName || 'New_Document.pdf'
    const extension = fileName.split('.').pop()?.toLowerCase()
    const fileType: FileType = extension === 'png' || extension === 'jpg' || extension === 'jpeg' ? 'image' : extension === 'doc' || extension === 'docx' ? 'doc' : 'pdf'

    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      name: fileName,
      category: uploadCategory,
      fileType,
      size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ocrIndexed: true,
      ocrSummary: `Newly uploaded ${uploadCategory} document queued for OCR indexing.`,
    }

    setDocuments([newDoc, ...documents])
    setIsUploadModalOpen(false)
    setUploadName('')
    setSelectedFile(null)
    triggerToast('Document uploaded and queued for verification!')
  }

  const getFileIcon = (type: FileType, className?: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className={cn('text-rose-500', className)} />
      case 'image':
        return <ImageIcon className={cn('text-[#F97316]', className)} />
      case 'doc':
        return <File className={cn('text-indigo-500', className)} />
    }
  }

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 size={13} /> Verified
          </span>
        )
      case 'Pending':
        return (
          <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            <Clock size={13} /> Pending
          </span>
        )
      case 'Rejected':
        return (
          <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle size={13} /> Rejected
          </span>
        )
    }
  }

  return (
    <div className="space-y-6 relative">
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

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#431407] tracking-tight">Document Center</h1>
            <p className="text-[#9A3412] mt-1 font-medium">Manage your internship certificates, reports, and evidence</p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-md shadow-[#F97316]/20"
          >
            <Upload size={16} />
            Upload Document
          </button>
        </div>

        {/* Tabs & Controls Section */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-white p-4 rounded-2xl border border-[#FED7AA] shadow-xs">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count =
                cat.value === 'All Documents'
                  ? documents.length
                  : documents.filter((d) => d.category === cat.value).length

              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200',
                    activeCategory === cat.value
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : 'bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA] hover:bg-white'
                  )}
                >
                  {cat.label}
                  <span
                    className={cn(
                      'px-1.5 py-0.5 rounded-md text-[10px]',
                      activeCategory === cat.value ? 'bg-white/20 text-white' : 'bg-white text-[#EA580C] border border-[#FED7AA]'
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search & View Toggle */}
          <div className="flex items-center gap-3 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3412]" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFF7ED] border border-[#FED7AA] rounded-xl pl-9 pr-4 py-2 text-xs text-[#431407] placeholder:text-[#9A3412]/60 focus:outline-none focus:border-[#F97316] transition-colors font-medium"
              />
            </div>

            <div className="flex items-center bg-[#FFF7ED] border border-[#FED7AA] p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={cn('p-1.5 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-[#F97316] text-white' : 'text-[#9A3412] hover:text-[#431407]')}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={cn('p-1.5 rounded-lg transition-colors', viewMode === 'table' ? 'bg-[#F97316] text-white' : 'text-[#9A3412] hover:text-[#431407]')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Documents Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs hover:border-[#F97316] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl">
                      {getFileIcon(doc.fileType, 'w-6 h-6')}
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                  <h3 className="font-bold text-sm text-[#431407] truncate" title={doc.name}>
                    {doc.name}
                  </h3>
                  <p className="text-[11px] text-[#9A3412] font-semibold mt-1">{doc.category}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#FED7AA] flex items-center justify-between">
                  <span className="text-[10px] text-[#9A3412] font-mono font-medium">{doc.size}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="p-1.5 text-[#9A3412] hover:text-[#F97316] hover:bg-[#FFF7ED] rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDownload(doc.name)}
                      className="p-1.5 text-[#9A3412] hover:text-[#F97316] hover:bg-[#FFF7ED] rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 text-[#9A3412] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#FED7AA] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-[#FFF7ED] border-b border-[#FED7AA] text-[#431407]">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Document Name</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Size</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Upload Date</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FED7AA]">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-[#FFF7ED] transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3 font-bold text-[#431407]">
                        {getFileIcon(doc.fileType, 'w-4 h-4')}
                        {doc.name}
                      </td>
                      <td className="px-6 py-4 text-[#9A3412] font-semibold">{doc.category}</td>
                      <td className="px-6 py-4 text-[#9A3412] font-mono">{doc.size}</td>
                      <td className="px-6 py-4 text-[#9A3412] font-medium">{doc.uploadDate}</td>
                      <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setPreviewDoc(doc)} className="p-1.5 text-[#9A3412] hover:text-[#F97316] rounded-lg">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => handleDownload(doc.name)} className="p-1.5 text-[#9A3412] hover:text-[#F97316] rounded-lg">
                            <Download size={16} />
                          </button>
                          <button onClick={() => handleDelete(doc.id)} className="p-1.5 text-[#9A3412] hover:text-rose-600 rounded-lg">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        <AnimatePresence>
          {isUploadModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsUploadModalOpen(false)} />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-[#FED7AA] rounded-2xl shadow-xl w-full max-w-lg overflow-hidden z-10">
                <div className="flex items-center justify-between p-6 border-b border-[#FED7AA] bg-[#FFF7ED]">
                  <h2 className="text-base font-bold text-[#431407]">Upload New Document</h2>
                  <button onClick={() => setIsUploadModalOpen(false)} className="text-[#9A3412] hover:text-[#431407]"><X size={20} /></button>
                </div>

                <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#431407] mb-1">Document Category</label>
                    <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value as DocumentCategory)} className="w-full bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-3 py-2 text-xs font-bold text-[#431407]">
                      {CATEGORIES.filter((c) => c.value !== 'All Documents').map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#431407] mb-1">File Display Name (Optional)</label>
                    <input type="text" placeholder="e.g. Sprint_2_Report.pdf" value={uploadName} onChange={(e) => setUploadName(e.target.value)} className="w-full bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-3 py-2 text-xs text-[#431407]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#431407] mb-1">Upload File</label>
                    <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="w-full text-xs text-[#9A3412] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#F97316] file:text-white hover:file:bg-[#EA580C]" />
                  </div>

                  <div className="pt-4 border-t border-[#FED7AA] flex justify-end gap-3">
                    <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-bold border border-[#FED7AA] text-[#9A3412]">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-[#F97316] text-white hover:bg-[#EA580C]">Upload & Verify</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Preview Modal */}
        <AnimatePresence>
          {previewDoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setPreviewDoc(null)} />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-[#FED7AA] rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden z-10">
                <div className="flex items-center justify-between p-4 border-b border-[#FED7AA] bg-[#FFF7ED]">
                  <div className="flex items-center gap-3">
                    {getFileIcon(previewDoc.fileType, 'w-6 h-6')}
                    <div>
                      <h2 className="text-sm font-bold text-[#431407]">{previewDoc.name}</h2>
                      <p className="text-[10px] text-[#9A3412] font-medium">{previewDoc.size} • Uploaded {previewDoc.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))} className="p-1.5 text-[#9A3412] hover:text-[#431407]"><ZoomOut size={16} /></button>
                    <button onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))} className="p-1.5 text-[#9A3412] hover:text-[#431407]"><ZoomIn size={16} /></button>
                    <button onClick={() => setRotation((r) => (r + 90) % 360)} className="p-1.5 text-[#9A3412] hover:text-[#431407]"><RotateCw size={16} /></button>
                    <button onClick={() => setPreviewDoc(null)} className="p-1.5 text-[#9A3412] hover:text-[#431407] ml-2"><X size={18} /></button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                  <div className="flex-1 bg-[#FAFAFA] p-6 flex items-center justify-center overflow-auto">
                    <div style={{ transform: `scale(${zoomLevel}) rotate(${rotation}deg)`, transition: 'transform 0.2s' }} className="w-full max-w-xl aspect-[1/1.3] bg-white border border-[#FED7AA] rounded-xl p-8 shadow-md relative">
                      <div className="h-4 bg-[#FED7AA] rounded w-1/3 mb-6"></div>
                      <div className="space-y-3">
                        <div className="h-2 bg-slate-100 rounded w-full"></div>
                        <div className="h-2 bg-slate-100 rounded w-full"></div>
                        <div className="h-2 bg-slate-100 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-80 bg-white border-l border-[#FED7AA] p-6 space-y-4">
                    <div className="flex items-center gap-2 text-[#EA580C] font-bold text-xs">
                      <Sparkles size={16} /> AI Extracted Text
                    </div>
                    <div className="p-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl text-xs text-[#431407] leading-relaxed font-medium">
                      {previewDoc.ocrSummary || 'Text extracted successfully.'}
                    </div>
                    <button onClick={() => triggerToast('Extracted OCR text copied to clipboard!')} className="w-full py-2 bg-[#F97316] text-white font-bold rounded-xl text-xs hover:bg-[#EA580C]">
                      Copy Extracted Text
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
