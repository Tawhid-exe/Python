import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import QuizEngine, { Question } from '@/features/quiz/QuizEngine'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '18-post-test')!

const POST_TEST_QUESTIONS: Question[] = [
  {
    id: 'po1',
    question: 'How do you check multiple mutually exclusive conditions in Python?',
    options: [
      'Using multiple if statements',
      'Using else if',
      'Using elif',
      'Using switch statements'
    ],
    correctIndex: 2,
    explanation: 'Python uses "elif" as a shorthand for "else if" to check multiple conditions in a ladder.'
  },
  {
    id: 'po2',
    question: 'What happens if you forget to indent the block inside an IF statement?',
    options: [
      'It skips the block',
      'It throws an IndentationError',
      'It runs normally',
      'It runs an infinite loop'
    ],
    correctIndex: 1,
    explanation: 'Python strictly enforces indentation to define blocks of code. Missing it causes an IndentationError.'
  },
  {
    id: 'po3',
    question: 'What is the output of the following ternary operator?',
    codeSnippet: 'age = 15\\nstatus = "Adult" if age >= 18 else "Minor"\\nprint(status)',
    options: [
      'Adult',
      'Minor',
      'Error',
      'None'
    ],
    correctIndex: 1,
    explanation: 'Since 15 >= 18 is False, it assigns the else value "Minor".'
  }
]

export default function PostTestPage() {
  return (
    <ModulePage module={MODULE}>
      <QuizEngine 
        title="Python IF-ELSE Final Post-Test" 
        questions={POST_TEST_QUESTIONS} 
      />
    </ModulePage>
  )
}
