export type Question =
  | StringQuestion
  | EmailQuestion
  | NumberQuestion
  | RadioButtonsQuestion

interface StringQuestion extends QuestionBase {
  type: 'StringQuestion'
  placeholder?: string
}

interface EmailQuestion extends QuestionBase {
  type: 'EmailQuestion'
  placeholder?: string
}

interface NumberQuestion extends QuestionBase {
  type: 'NumberQuestion'
  placeholder?: string
}
interface RadioButtonsQuestion extends QuestionBase {
  type: 'RadioButtonsQuestion'
  placeholder?: string
  choices: { key: string; text: string }[]
}

interface QuestionBase {
  text: string
  answerKey: string
}
