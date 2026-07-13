import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X, AlertTriangle, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useSettingsStore } from '@/store/useSettingsStore'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { runPython, initPyodide } from '@/services/pyodide'
import { PROBLEM_GROUPS, ALL_PROBLEMS } from '@/data/problems'

const GROUP_COLORS: Record<string, string> = {
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  primary: 'text-primary-400 bg-primary-500/10 border-primary-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
}
const GROUP_ACTIVE: Record<string, string> = {
  emerald: 'bg-emerald-500/10 border-emerald-500/30',
  primary: 'bg-primary-500/10 border-primary-500/30',
  amber: 'bg-amber-500/10 border-amber-500/30',
  rose: 'bg-rose-500/10 border-rose-500/30',
}
const GROUP_TITLE: Record<string, string> = {
  emerald: 'text-emerald-300',
  primary: 'text-primary-300',
  amber: 'text-amber-300',
  rose: 'text-rose-300',
}

export default function CodeEditorPanel() {
  const { codePanelMode, expandCodePanel, closeCodePanel, toggleCodePanel } = useSettingsStore()
  const firstProblem = ALL_PROBLEMS[0]
  const [code, setCode] = useState(firstProblem.code)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [activeProblem, setActiveProblem] = useState(firstProblem)
  const [inputs, setInputs] = useState<string[]>([])
  const [newInput, setNewInput] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const highlightRef = useRef<HTMLDivElement>(null)

  const isSlim = codePanelMode === 'slim'
  const isExpanded = codePanelMode === 'expanded'
  const isOpen = isSlim || isExpanded

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const expandedWidth = windowWidth * 0.5

  useEffect(() => {
    if (isOpen) initPyodide().catch(console.error)
  }, [isOpen])

  const handleRun = async () => {
    if (!code.trim()) return
    setIsRunning(true)
    setOutput('Running...\n')
    setErrorMsg(null)
    const result = await runPython(code, inputs)
    if (!result.success) {
      setErrorMsg('Syntax or runtime error. Check output.')
      setOutput('Python Sandbox Error:\n\n' + result.output)
    } else {
      setOutput(result.output || '(No output)')
    }
    setIsRunning(false)
  }

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.currentTarget.scrollTop
      highlightRef.current.scrollLeft = e.currentTarget.scrollLeft
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newCode = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newCode)
      setTimeout(() => {
        if (e.currentTarget) e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4
      }, 0)
    }
  }

  const addInput = () => {
    if (newInput.trim()) { setInputs([...inputs, newInput.trim()]); setNewInput('') }
  }
  const removeInput = (idx: number) => setInputs(inputs.filter((_, i) => i !== idx))

  const loadProblem = (prob: typeof ALL_PROBLEMS[0]) => {
    setActiveProblem(prob)
    setCode(prob.code)
    setOutput('')
    setErrorMsg(null)
    setInputs([])
  }

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="code-panel"
          initial={{ x: '100%', width: isSlim ? 56 : expandedWidth }}
          animate={{ x: 0, width: isSlim ? 56 : expandedWidth }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          className="fixed top-[60px] right-0 bottom-0 z-40 flex bg-[#06060c] border-l border-white/10 overflow-hidden"
        >
          {/* ── SLIM STRIP ── */}
          {isSlim && (
            <div className="w-full flex flex-col items-center py-6 gap-4">
              <motion.button
                onClick={expandCodePanel}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                title="Expand Python Workspace"
                className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 hover:bg-primary-500/30 transition-colors"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] rotate-90 whitespace-nowrap select-none">
                  Python Workspace
                </div>
              </div>
              <button
                onClick={closeCodePanel}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/20 hover:text-white/60 hover:bg-white/5 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* ── EXPANDED PANEL ── */}
          {isExpanded && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#0a0a14] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-white/50">solution.py</div>
                  <span className="text-xs text-white/20 hidden md:block">Python 3.12 (WASM Sandbox)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => loadProblem(activeProblem)} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/50 text-xs hover:bg-white/5 transition-colors">
                    <RotateCcw size={12} /> Reset
                  </button>
                  <button onClick={toggleCodePanel} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/50 text-xs hover:bg-white/5 transition-colors">
                    <ChevronRight size={14} /> Collapse
                  </button>
                  <button onClick={closeCodePanel} className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 flex overflow-hidden">

                {/* ── Problem Sidebar ── */}
                <div className="w-[220px] xl:w-[250px] border-r border-white/5 bg-[#0a0a14] flex flex-col overflow-y-auto flex-shrink-0">
                  <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest px-3 pt-3 pb-2">
                    Problems ({ALL_PROBLEMS.length})
                  </div>

                  {PROBLEM_GROUPS.map(group => {
                    const isCollapsed = collapsedGroups[group.id]
                    return (
                      <div key={group.id} className="mb-1">
                        {/* Group header */}
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/3 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide', GROUP_COLORS[group.color])}>
                              {group.problems.length}
                            </span>
                            <span className={cn('text-[10px] font-semibold', GROUP_TITLE[group.color])}>
                              {group.label}
                            </span>
                          </div>
                          <span className="text-white/20 text-[10px]">{isCollapsed ? '▶' : '▼'}</span>
                        </button>

                        {/* Problems list */}
                        {!isCollapsed && (
                          <div className="px-2 pb-1 space-y-1">
                            {group.problems.map(prob => {
                              const isActive = activeProblem.id === prob.id
                              return (
                                <button
                                  key={prob.id}
                                  onClick={() => loadProblem({ ...prob, groupId: group.id, groupLabel: group.label, groupColor: group.color })}
                                  className={cn(
                                    'w-full text-left p-2.5 rounded-lg border transition-all duration-150',
                                    isActive
                                      ? GROUP_ACTIVE[group.color]
                                      : 'bg-transparent border-transparent hover:border-white/8 hover:bg-white/3'
                                  )}
                                >
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <span className="text-[8px] text-white/25 font-mono">#{prob.id}</span>
                                    <span className={cn(
                                      'text-[8px] px-1 py-0.5 rounded font-medium capitalize',
                                      prob.difficulty === 'easy' ? 'text-emerald-400/70' :
                                      prob.difficulty === 'medium' ? 'text-amber-400/70' : 'text-rose-400/70'
                                    )}>
                                      {prob.difficulty}
                                    </span>
                                  </div>
                                  <h3 className={cn(
                                    'text-[11px] font-medium leading-tight',
                                    isActive ? GROUP_TITLE[group.color] : 'text-white/60'
                                  )}>
                                    {prob.title}
                                  </h3>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* ── Editor + Terminal ── */}
                <div className="flex-1 flex flex-col overflow-hidden">

                  {/* Active problem description bar */}
                  <div className="px-4 py-2.5 border-b border-white/5 bg-[#0d0d18] flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase', GROUP_COLORS[activeProblem.groupColor])}>
                        {activeProblem.groupLabel}
                      </span>
                      <span className={cn(
                        'text-[9px] px-1.5 py-0.5 rounded font-medium capitalize',
                        activeProblem.difficulty === 'easy' ? 'text-emerald-400 bg-emerald-500/10' :
                        activeProblem.difficulty === 'medium' ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10'
                      )}>
                        {activeProblem.difficulty}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2">{activeProblem.desc}</p>
                  </div>

                  {/* Code Editor */}
                  <div className="flex-1 relative bg-[#0f0f1a] overflow-hidden border-b border-white/5">
                    <div className="absolute top-3 right-3 z-20">
                      <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all disabled:opacity-50 shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                      >
                        {isRunning
                          ? <span className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          : <Play size={11} fill="currentColor" />}
                        Run
                      </button>
                    </div>
                    <textarea
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      onScroll={handleScroll}
                      onKeyDown={handleKeyDown}
                      className="absolute inset-0 w-full h-full p-4 pl-14 bg-transparent text-transparent caret-emerald-400 outline-none resize-none z-10 font-mono text-[13px] leading-relaxed whitespace-pre overflow-auto"
                      spellCheck={false}
                    />
                    <div ref={highlightRef} className="absolute inset-0 pointer-events-none p-4 font-mono text-[13px] leading-relaxed overflow-hidden whitespace-pre">
                      <SyntaxHighlighter
                        language="python"
                        style={oneDark}
                        customStyle={{ background: 'transparent', padding: 0, margin: 0 }}
                        showLineNumbers
                        lineNumberStyle={{ color: 'rgba(255,255,255,0.18)', paddingRight: '1.5rem', userSelect: 'none', fontSize: '11px' }}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  {/* STDIN + Output */}
                  <div className="h-[42%] flex flex-col overflow-hidden bg-[#06060c]">
                    <div className="px-4 pt-3 pb-2 border-b border-white/5 flex-shrink-0">
                      <div className="text-[9px] font-mono text-fuchsia-400/70 uppercase tracking-widest mb-2">STDIN Inputs</div>
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {inputs.map((inp, i) => (
                          <div key={i} className="flex items-center gap-1 px-2 py-1 bg-[#0a0a0f] border border-white/10 rounded-full text-[10px] font-mono">
                            <span className="text-white/30">#{i + 1}:</span>
                            <span className="text-emerald-400">{inp}</span>
                            <button onClick={() => removeInput(i)} className="ml-0.5 text-white/20 hover:text-rose-400 transition-colors"><X size={10} /></button>
                          </div>
                        ))}
                        <div className="flex items-center gap-1 bg-[#0a0a0f] border border-white/10 rounded-full px-2 py-1">
                          <input
                            type="text"
                            value={newInput}
                            onChange={e => setNewInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addInput()}
                            placeholder="Add input..."
                            className="bg-transparent border-none outline-none text-[10px] text-white placeholder-white/20 w-24 font-mono"
                          />
                          <button onClick={addInput} className="text-emerald-400 hover:text-emerald-300 font-medium text-[10px] transition-colors">Add</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 font-mono text-[12px] leading-loose">
                      {output
                        ? <span className={errorMsg ? 'text-rose-400' : 'text-emerald-400'}>{output}</span>
                        : <span className="text-white/20 italic">Run code to see output...</span>}
                    </div>
                    {errorMsg && (
                      <div className="px-4 py-3 border-t border-rose-500/20 bg-rose-500/5 flex items-start gap-2 flex-shrink-0">
                        <AlertTriangle size={14} className="text-rose-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-rose-300/80 leading-relaxed">{errorMsg}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
