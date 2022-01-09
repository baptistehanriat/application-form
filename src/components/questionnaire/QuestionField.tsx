import styled from 'styled-components'
import RadioInput from '../input/RadioInput'
import { TextInput } from '../input/TextInput'
import View from '../layout/View'
import { H2 } from '../style/texts'
import { Question } from './types'

export default function QuestionField(props: QuestionFieldProps) {
  // const validateNumberFormat = (phone: string) => {
  //   return /^\d+$/.test(phone)
  // }

  // const validateEmailFormat = (email: string) => {
  //   return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
  // }

  switch (props.question.type) {
    case 'StringQuestion':
      return <TextInputQuestion type="text" {...props} />
    case 'NumberQuestion':
      return <TextInputQuestion type="text" {...props} />
    case 'EmailQuestion':
      return <TextInputQuestion type="email" {...props} />
    case 'RadioButtonsQuestion':
      return (
        <Container>
          <QuestionLabel>{props.question.text}</QuestionLabel>
          <RadioInput
            choices={props.question.choices!}
            onChange={props.onChange}
          />
        </Container>
      )
  }
}

function TextInputQuestion(props: TextInputQuestionProps) {
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      props.onGoNext()
    }
  }
  return (
    <Container>
      <QuestionLabel>{props.question.text}</QuestionLabel>
      <TextInput
        type={props.type}
        placeholder={props.question.placeholder}
        onKeyDown={keyDownHandler}
        value={props.answer || ''}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Container>
  )
}

interface QuestionFieldProps {
  question: Question
  answer: string
  onChange(answer: string): void
  onGoNext(): void
}

interface TextInputQuestionProps extends QuestionFieldProps {
  type: string
}

const Container = styled(View)`
  margin-bottom: 50px;
  margin-top: 20px;
`

const QuestionLabel = styled(H2)`
  margin-left: 20px;
  margin-bottom: 20px;
`
