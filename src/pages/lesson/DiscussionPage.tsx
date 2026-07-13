import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, ChevronDown, Code2, Lightbulb,
  Bug, CheckCircle2, Terminal, BookOpen, Zap,
} from 'lucide-react'
import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerContainer, staggerChild, scaleIn, fadeIn } from '@/utils/motion'
import { cn } from '@/utils/cn'
import Card, { GlowCard } from '@/components/common/Card/Card'
import Button from '@/components/common/Button/Button'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { PROBLEM_GROUPS } from '@/data/problems'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '05-discussion')!

// ─── Section Data (from PDF script) ──────────────────────────
const SECTIONS = [
  {
    id: 'intro',
    timestamp: '00:00',
    title: 'Introduction & Agenda',
    icon: '🎬',
    callout: 'We will cover everything from basic if/else to elif ladders and the ternary operator — through real coding problems.',
    content: `An IF statement tells Python to execute a block of code only if a certain condition is True. In our daily lives, we make decisions based on conditions — "If it is raining, I will take an umbrella; otherwise, I won't." Python does the exact same thing.`,
    code: null,
    traps: [],
  },
  {
    id: 'basic',
    timestamp: '02:00',
    title: 'Section 1 — Basic IF / ELSE & Comparison Operators',
    icon: '1️⃣',
    callout: 'Unlike C or Java that use curly braces {}, Python relies entirely on indentation.',
    content: `An if statement tells Python to execute a block of code only if a certain condition is True. If it's False, we can use an else statement to run a different block. Notice the indentation — the spaces before the code inside the block define what belongs inside the if.`,
    code: `if condition:\n    # Code to run if True\nelse:\n    # Code to run if False`,
    traps: [],
  },
  {
    id: 'logical',
    timestamp: '08:30',
    title: 'Section 2 — Logical Operators (and, or, not)',
    icon: '2️⃣',
    callout: 'In C you use && or ||. In Python, we use plain English: and, or, not.',
    content: `What if we need to check multiple conditions at the same time? Python uses plain English words instead of symbols. The "and" operator requires BOTH conditions to be True. The "or" operator requires at least ONE to be True. The "not" operator reverses the result.`,
    code: `# and — both must be True\nif age >= 18 and has_id:\n    print("Access Granted")\n\n# or — at least one must be True\nif is_admin or is_owner:\n    print("Full Access")\n\n# not — reverses the condition\nif not is_banned:\n    print("Welcome!")`,
    traps: [],
  },
  {
    id: 'nested',
    timestamp: '14:00',
    title: 'Section 3 — Nested IF-ELSE Blocks',
    icon: '3️⃣',
    callout: 'Nesting means placing an IF statement inside another IF block.',
    content: `Sometimes you need to check a condition only after a previous condition has proven to be True. This is called Nesting. Let's look at a classic problem — finding the greatest of 3 numbers without using logical operators.`,
    code: `a, b, c = 10, 25, 15\nif a > b:\n    if a > c:\n        print("A is the greatest")\n    else:\n        print("C is the greatest")\nelse:\n    if b > c:\n        print("B is the greatest")\n    else:\n        print("C is the greatest")`,
    traps: [],
  },
  {
    id: 'elif',
    timestamp: '18:00',
    title: 'Section 4 — Elif Ladders (Multiple Conditions)',
    icon: '4️⃣',
    callout: 'Order matters! Python checks from top to bottom. Once True, the rest are skipped.',
    content: `Nesting too deep makes our code messy and hard to read. When we have multiple mutually exclusive conditions, Python gives us the "elif" keyword, which stands for "else if". It keeps code flat and readable.`,
    code: `marks = int(input("Enter marks: "))\nif marks > 80:\n    print("Grade: A")\nelif marks > 60:\n    print("Grade: B")\nelif marks > 40:\n    print("Grade: C")\nelse:\n    print("Grade: D")`,
    traps: [],
  },
  {
    id: 'ternary',
    timestamp: '22:30',
    title: 'Section 5 — The Ternary Operator',
    icon: '5️⃣',
    callout: 'Syntax: [True Value] if [Condition] else [False Value] — reads just like English.',
    content: `Python has a Ternary Operator — it lets you write a simple if/else statement in a single line. This is great for simple assignments and makes code much more concise.`,
    code: `# Standard if/else\nnum = 10\nif num % 2 == 0:\n    result = "Even"\nelse:\n    result = "Odd"\n\n# One-liner ternary equivalent\nresult = "Even" if num % 2 == 0 else "Odd"\nprint(result)  # Even`,
    traps: [],
  },
  {
    id: 'truthy',
    timestamp: '25:00',
    title: 'Section 6 — Truthy vs. Falsy Values',
    icon: '6️⃣',
    callout: 'A Python secret that separates beginners from pros.',
    content: `An if statement doesn't actually need a mathematical comparison like x > 5. In Python, 0 is evaluated as False. Any non-zero number (like 1, -5, or 100) is True. Empty strings and empty lists are False, while filled ones are True.`,
    code: `# 0 is False, any non-zero is True\nif 0:\n    print("This won't print")\nif 5:\n    print("This will print!")  # prints\n\n# Empty = False, Filled = True\nif "":\n    print("Empty string - won't print")\nif "Hello":\n    print("Filled string - will print!")  # prints\n\n# Tricky example\nif 3 + 2 % 5:\n    print("Will this print?")  # 2%5=2, 3+2=5, 5 is truthy → prints`,
    traps: [],
  },
  {
    id: 'traps',
    timestamp: '27:30',
    title: 'Section 7 — Predict the Output (Common Traps)',
    icon: '🐛',
    callout: "Don't run the code — try to predict what it will do. These trips up most beginners.",
    content: `To wrap up, let's play "Predict the Output". These are the most common traps that trip up beginners coming from other languages.`,
    code: null,
    traps: [
      {
        title: 'Trap 1: Indentation Error',
        code: `if 5 > 3:\nprint("Hello")`,
        explanation: 'In C, missing brackets might just run the next line. In Python, this throws an IndentationError. Python requires strict spacing — always indent with 4 spaces!',
      },
      {
        title: 'Trap 2: Assignment vs. Equality (= vs ==)',
        code: `x = 10\nif x = 5:\n    print("X is 5")`,
        explanation: 'In C, x = 5 inside an if assigns 5 to X. But Python throws a SyntaxError immediately — protecting you from this mistake. Always use == for comparison!',
      },
      {
        title: 'Trap 3: Type Equality (int vs str)',
        code: `if 3 == 3.0:\n    print("Match 1")  # prints!\nif "3" == 3:\n    print("Match 2")  # NEVER prints`,
        explanation: 'Python recognizes that integer 3 and float 3.0 hold the same numeric value. However, a string "3" will NEVER equal an integer 3. Type matters!',
      },
    ],
  },
  {
    id: 'homework',
    timestamp: '30:00',
    title: 'Conclusion & Homework',
    icon: '🏠',
    callout: 'Practice makes perfect. Write the code for these in the comments!',
    content: `You have done an incredible job today! We covered basic branching, logical operators, nested if-elses, elif ladders, and Python's ternary operator. Here is your homework:`,
    code: null,
    traps: [],
    homework: [
      { num: 1, title: 'Leap Year Checker', desc: 'Take a year as input and check if it\'s a leap year. (The logic is trickier than you think — watch out for the century rule!)' },
      { num: 2, title: 'Greatest of 4', desc: 'Take 4 positive integers and print the greatest.' },
      { num: 3, title: 'Smallest of 3', desc: 'Take 3 numbers and find the minimum using only nested if-else logic.' },
      { num: 4, title: 'Collinear Points', desc: 'Take 3 coordinate points (x1,y1), (x2,y2), (x3,y3) and calculate their slopes to find if they fall on a single straight line.' },
    ],
  },
]

// ─── Difficulty badge ─────────────────────────────────────────
const DIFF_COLORS = {
  easy:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  hard:   'bg-rose-500/10 text-rose-400 border-rose-500/20',
}

const GROUP_HEADER_COLORS: Record<string, string> = {
  emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300',
  primary: 'border-primary-500/20 bg-primary-500/5 text-primary-300',
  amber:   'border-amber-500/20 bg-amber-500/5 text-amber-300',
  rose:    'border-rose-500/20 bg-rose-500/5 text-rose-300',
}

// ─── Problem Card ─────────────────────────────────────────────
const ProblemCard = memo(({ problem }: { problem: typeof PROBLEM_GROUPS[0]['problems'][0] }) => {
  const [showSolution, setShowSolution] = useState(false)
  const [showHint, setShowHint] = useState(false)

  return (
    <motion.div variants={staggerChild}>
      <Card className="space-y-4" padding="lg">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize', DIFF_COLORS[problem.difficulty])}>
              {problem.difficulty}
            </span>
            <h3 className="text-base font-semibold text-white/90 mt-1">#{problem.id} — {problem.title}</h3>
          </div>
          <Code2 size={16} className="text-white/20 flex-shrink-0 mt-1" />
        </div>

        <p className="text-sm text-white/55 leading-relaxed">{problem.desc}</p>

        {/* Hint */}
        <div>
          <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-1.5 text-amber-400/70 hover:text-amber-400 text-xs font-medium transition-colors">
            <Lightbulb size={12} />
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mt-2 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/15 text-xs text-amber-300/80">
                💡 {problem.hint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Solution */}
        <div>
          <button onClick={() => setShowSolution(!showSolution)} className="flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white/70 transition-colors">
            <ChevronDown size={14} className={cn('transition-transform', showSolution && 'rotate-180')} />
            {showSolution ? 'Hide solution' : 'Reveal solution'}
          </button>
          <AnimatePresence>
            {showSolution && (
              <motion.div variants={scaleIn} initial="hidden" animate="visible" exit="exit" className="mt-3 space-y-3">
                <div className="rounded-xl overflow-hidden border border-white/8">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/3 border-b border-white/8">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Terminal size={12} />
                      <span className="font-mono">solution.py</span>
                    </div>
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  </div>
                  <SyntaxHighlighter language="python" style={oneDark}
                    customStyle={{ margin: 0, padding: '1rem', background: 'rgba(255,255,255,0.02)', fontSize: '0.8rem', lineHeight: '1.7' }}
                    showLineNumbers lineNumberStyle={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem' }}>
                    {problem.code}
                  </SyntaxHighlighter>
                </div>
                {problem.output && (
                  <div className="rounded-lg bg-[#0f0f1a] border border-white/8 px-4 py-3">
                    <div className="text-[10px] text-white/25 font-mono mb-1.5">Expected Output:</div>
                    <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap">{problem.output}</pre>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
})
ProblemCard.displayName = 'ProblemCard'

// ─── Section Card ─────────────────────────────────────────────
const SectionCard = memo(({ section, index }: { section: typeof SECTIONS[0]; index: number }) => {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div variants={staggerChild}>
      <div className={cn('rounded-2xl border transition-colors duration-200',
        expanded ? 'bg-white/[0.04] border-white/10' : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10')}>
        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-primary-400/60 bg-primary-500/10 px-2 py-1 rounded-lg flex-shrink-0">{section.timestamp}</span>
            <span className="text-lg">{section.icon}</span>
            <span className="text-sm font-semibold text-white/85">{section.title}</span>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-white/30 flex-shrink-0" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
              className="px-5 pb-5">
              <div className="border-t border-white/6 pt-4 space-y-4">

                {/* Callout */}
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-primary-500/5 border border-primary-500/15">
                  <Zap size={14} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-primary-200/80 font-medium">{section.callout}</p>
                </div>

                <p className="text-sm text-white/55 leading-relaxed">{section.content}</p>

                {/* Code block */}
                {section.code && (
                  <div className="rounded-xl overflow-hidden border border-white/8">
                    <SyntaxHighlighter language="python" style={oneDark}
                      customStyle={{ margin: 0, padding: '1rem', background: '#0a0a0f', fontSize: '0.8rem', lineHeight: '1.7' }}>
                      {section.code}
                    </SyntaxHighlighter>
                  </div>
                )}

                {/* Traps (Section 7) */}
                {section.traps && section.traps.length > 0 && (
                  <div className="space-y-3 pt-2">
                    {section.traps.map((trap, i) => (
                      <div key={i} className="rounded-2xl bg-rose-500/4 border border-rose-500/15 p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Bug size={14} className="text-rose-400 flex-shrink-0" />
                          <h4 className="text-sm font-semibold text-white/85">{trap.title}</h4>
                        </div>
                        <div className="rounded-lg overflow-hidden border border-rose-500/15">
                          <SyntaxHighlighter language="python" style={oneDark}
                            customStyle={{ margin: 0, padding: '0.75rem 1rem', background: 'rgba(244,63,94,0.04)', fontSize: '0.8rem' }}>
                            {trap.code}
                          </SyntaxHighlighter>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed">{trap.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Homework (Section 8) */}
                {'homework' in section && section.homework && (
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    {section.homework.map((hw: { num: number; title: string; desc: string }) => (
                      <div key={hw.num} className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 text-[10px] font-bold flex items-center justify-center">{hw.num}</span>
                          <span className="text-sm font-semibold text-white/85">{hw.title}</span>
                        </div>
                        <p className="text-xs text-white/45 leading-relaxed pl-7">{hw.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
})
SectionCard.displayName = 'SectionCard'

// ─── Main Page ────────────────────────────────────────────────
export default function DiscussionPage() {
  const [activeTab, setActiveTab] = useState<'sections' | 'problems'>('sections')
  const [activeGroup, setActiveGroup] = useState('basic')

  const tabs = [
    { id: 'sections', label: 'Lesson Sections', count: SECTIONS.length, icon: BookOpen },
    { id: 'problems', label: 'Practice Problems', count: 37, icon: Code2 },
  ] as const

  const currentGroup = PROBLEM_GROUPS.find(g => g.id === activeGroup) ?? PROBLEM_GROUPS[0]

  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">

        {/* ── YouTube Video ── */}
        <motion.div variants={staggerChild}>
          <GlowCard color="primary" className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-primary-300/70 font-medium">
              <Play size={12} />
              <span>LESSON VIDEO</span>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden border border-white/8">
              <iframe
                src="https://www.youtube.com/embed/nMEFZ6TvkDA?si=i-FXFYIrhS0YuOEa"
                title="Python IF-ELSE Statements: From Basic to Advanced"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </GlowCard>
        </motion.div>

        {/* ── Tab Navigation ── */}
        <motion.div variants={staggerChild}>
          <div className="flex gap-1 p-1 rounded-xl bg-white/3 border border-white/8 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-primary-500/20 text-primary-300 border border-primary-500/25'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/4',
                )}
              >
                <tab.icon size={13} />
                {tab.label}
                <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-mono',
                  activeTab === tab.id ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-white/25')}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">

          {/* SECTIONS TAB */}
          {activeTab === 'sections' && (
            <motion.div key="sections" variants={staggerContainer} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="space-y-3">
              {SECTIONS.map((section, i) => (
                <SectionCard key={section.id} section={section} index={i} />
              ))}
            </motion.div>
          )}

          {/* PROBLEMS TAB */}
          {activeTab === 'problems' && (
            <motion.div key="problems" variants={staggerContainer} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="space-y-6">

              {/* Group filter bar */}
              <div className="flex flex-wrap gap-2">
                {PROBLEM_GROUPS.map(group => (
                  <button
                    key={group.id}
                    onClick={() => setActiveGroup(group.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                      activeGroup === group.id
                        ? GROUP_HEADER_COLORS[group.color]
                        : 'border-white/8 text-white/40 hover:text-white/70 hover:border-white/15'
                    )}
                  >
                    {group.label}
                    <span className="font-mono opacity-60">{group.problems.length}</span>
                  </button>
                ))}
              </div>

              {/* Group header */}
              <div className={cn('px-4 py-3 rounded-xl border', GROUP_HEADER_COLORS[currentGroup.color])}>
                <div className="flex items-center gap-2">
                  <Code2 size={14} />
                  <span className="font-semibold text-sm">{currentGroup.label}</span>
                  <span className="text-xs opacity-60 font-mono ml-auto">{currentGroup.problems.length} problems</span>
                </div>
              </div>

              {/* Problems */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                {currentGroup.problems.map(prob => (
                  <ProblemCard key={prob.id} problem={prob} />
                ))}
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </ModulePage>
  )
}
