import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import QuizEngine, { Question } from '@/features/quiz/QuizEngine'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '04-pre-test')!

const PRE_TEST_QUESTIONS: Question[] = [
  {
    id: 'pt-A3',
    question: 'Which of these are valid comparison operators in Python?',
    options: [
      '!=',
      '=>',
      '>=',
      '=='
    ],
    correctIndices: [0, 2, 3],
    explanation: '(Multiple correct — A, C, D) Python uses != for not equal, >= for greater than or equal, and == for equality. => is not a valid operator.'
  },
  {
    id: 'pt-A4',
    question: 'Which of the following programs will correctly print "Pass" when marks = 55?',
    options: [
      'if marks > 60: print("Pass")',
      'if marks >= 50: print("Pass")',
      'if marks == 55 and marks > 60: print("Pass")',
      'if marks >= 55: print("Pass")'
    ],
    correctIndices: [1, 3],
    explanation: '(Multiple correct — B, D) Since marks = 55, both >= 50 and >= 55 evaluate to True. Option A requires > 60 and Option C requires > 60 which are False.'
  },
  {
    id: 'pt-A5',
    question: 'What are real-life uses of IF-ELSE in programming?',
    options: [
      'Checking if a user\'s password is correct in a login system',
      'Deciding what grade a student gets based on marks',
      'Checking if a bank account has enough balance for a withdrawal',
      'Printing the same message every time without any condition'
    ],
    correctIndices: [0, 1, 2],
    explanation: '(Multiple correct — A, B, C) IF-ELSE is for conditional logic. Printing the same message unconditionally does not require IF-ELSE.'
  },
  {
    id: 'pt-B1',
    question: 'What does elif mean in Python?',
    options: [
      'end loop if',
      'else loop',
      'else if',
      'extra if'
    ],
    correctIndices: [2],
    explanation: '(1 correct answer — C) In Python, "elif" is short for "else if".'
  },
  {
    id: 'pt-A2',
    question: 'Which of the following is the correct way to write an if statement in Python?',
    options: [
      'if x > 5 then:',
      'IF x > 5:',
      'if x > 5',
      'if (x > 5) do:'
    ],
    correctIndices: [],
    explanation: '(No correct answer 🛑) Python requires a colon (:) at the end of the if statement, e.g., "if x > 5:". None of the options are correct.'
  },
  {
    id: 'pt-B3',
    question: 'What will this code output?',
    codeSnippet: 'x = 5\nif x == 10:\n    print("Ten")\nelif x == 20:\n    print("Twenty")',
    options: [
      'Ten',
      'Twenty',
      'TenTwenty',
      'Error'
    ],
    correctIndices: [],
    explanation: '(No correct answer 🛑) Since x is 5, neither condition is met, and there is no else block. The code will output nothing. None of the options are correct.'
  },
  {
    id: 'pt-C1',
    question: 'Which operator is used to assign a value to a variable in an if condition check?',
    options: [
      '===',
      '=',
      '==>',
      '->'
    ],
    correctIndices: [],
    explanation: '(No correct answer 🛑) In Python, the assignment operator "=" cannot be used inside an if condition check (unless using the walrus operator :=). Comparing uses ==. Therefore, none are correct for standard assignment.'
  },
  {
    id: 'pt-C2',
    question: 'What happens when an if condition is False and there is no else block?',
    options: [
      'Python gives a runtime error',
      'Python skips the if block and continues to the next line',
      'Python runs the if block anyway',
      'The program stops completely'
    ],
    correctIndices: [1],
    explanation: '(1 correct answer — B) If the condition is False and there is no else block, Python simply skips the if block and moves on.'
  },
  {
    id: 'pt-D1',
    question: 'What will `True and False` evaluate to in Python?',
    options: [
      'False',
      'True',
      'None',
      'Error'
    ],
    correctIndices: [0],
    explanation: '(1 correct answer — A) The logical AND operator requires both sides to be True to evaluate to True. Since one is False, it evaluates to False.'
  },
  {
    id: 'pt-D5',
    question: 'Which code correctly checks if a number is even?',
    options: [
      'if num % 2 == 1: print("Even")',
      'if num / 2 == 0: print("Even")',
      'if num % 2 == 0: print("Even")',
      'if num == 2: print("Even")'
    ],
    correctIndices: [2],
    explanation: '(1 correct answer — C) The modulo operator % returns the remainder. An even number divided by 2 has a remainder of 0.'
  }
]


export default function PreTestPage() {
  return (
    <ModulePage module={MODULE}>
      <div className="mt-10">
        <QuizEngine 
          title="Python IF-ELSE Pre-Assessment" 
          questions={PRE_TEST_QUESTIONS} 
        />
      </div>
    </ModulePage>
  )
}
