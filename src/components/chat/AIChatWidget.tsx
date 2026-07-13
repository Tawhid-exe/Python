import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { MessageSquare, X, Send, Bot, GripHorizontal, User } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useChatStore } from '@/store/useChatStore'
import { useProgressStore } from '@/store/useProgressStore'
import { getModuleById } from '@/constants/modules'
import { sendMessageStreamToGemini } from '@/services/gemini'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  const constraintsRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  
  const { messages, addMessage, updateMessage } = useChatStore()
  const { progress } = useProgressStore()

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isTyping])

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return
    setErrorMsg('')
    
    const userMsg = inputValue.trim()
    setInputValue('')
    
    // Add user message to UI immediately
    addMessage({ id: Date.now().toString(), role: 'user', content: userMsg })
    setIsTyping(true)
    
    // Add empty model message immediately
    const responseId = (Date.now() + 1).toString()
    addMessage({ id: responseId, role: 'model', content: '' })
    
    try {
      const historyToPass = messages.slice(1) 
      
      // Extract dynamic context based on current URL
      const pathParts = window.location.pathname.split('/')
      const moduleId = pathParts[pathParts.length - 1]
      const currentModule = getModuleById(moduleId)
      
      const stream = sendMessageStreamToGemini(historyToPass, userMsg, {
        currentModuleTitle: currentModule?.title,
        progressPercent: progress.overallPercent
      })
      
      let fullText = ''
      for await (const chunk of stream) {
        setIsTyping(false) // turn off typing indicator once first chunk arrives
        fullText += chunk
        updateMessage(responseId, { content: fullText })
      }
    } catch (error: any) {
      setErrorMsg(error.message)
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Invisible constraints area for dragging so it doesn't go off-screen */}
      <div ref={constraintsRef} className="fixed inset-4 pointer-events-none z-[60]" />

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="chat-bubble"
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              'fixed bottom-6 right-6 z-[60] cursor-grab active:cursor-grabbing pointer-events-auto',
              'w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center text-white',
              'shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(99,102,241,0.4)]'
            )}
          >
            <MessageSquare size={24} />
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="chat-window"
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragListener={false}
            dragControls={dragControls}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={cn(
              'fixed bottom-6 right-6 z-[60] pointer-events-auto',
              'w-[340px] h-[500px] flex flex-col',
              'bg-[#0f0f1a]/95 backdrop-blur-2xl rounded-2xl border border-white/10',
              'shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden'
            )}
          >
            {/* Header / Drag Handle */}
            <div 
              className="chat-handle flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Bot size={18} className="text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/90">AI Tutor</h3>
                  <p className="text-[10px] text-white/40">Ready to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <GripHorizontal size={16} />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' && "flex-row-reverse")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center",
                    msg.role === 'model' ? "bg-primary-500/20 text-primary-400" : "bg-emerald-500/20 text-emerald-400"
                  )}>
                    {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm max-w-[85%] break-words",
                    msg.role === 'model' 
                      ? "bg-white/5 rounded-tl-sm text-white/80 border border-white/5" 
                      : "bg-primary-600 rounded-tr-sm text-white"
                  )}>
                    <Markdown 
                      remarkPlugins={[remarkGfm]}
                      className={cn(
                        "prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#0a0a0f] prose-pre:border prose-pre:border-white/10 prose-code:text-primary-300",
                        msg.role === 'user' && "text-white prose-p:text-white"
                      )}
                    >
                      {msg.content}
                    </Markdown>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex-shrink-0 flex items-center justify-center">
                    <Bot size={16} className="text-primary-400" />
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 border border-white/5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              {errorMsg && (
                <div className="text-xs text-rose-400 bg-rose-500/10 p-2 rounded-lg text-center border border-rose-500/20">
                  {errorMsg}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-2 bg-[#0a0a0f] rounded-xl border border-white/10 p-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm text-white placeholder-white/30"
                  disabled={isTyping}
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-400 transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
