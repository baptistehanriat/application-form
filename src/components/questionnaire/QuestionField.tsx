import { PrettyInputBase } from '../input/InputBase'
import InputRadio from '../input/InputRadio'
import View from '../layout/View'
import { P1 } from '../style/texts'
import { Question } from './types'

export default function QuestionField(props: QuestionFieldProps) {
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      // could add the enter event
    }
  }

  const validatePhoneFormat = (phone: string) => {
    return /^\d+$/.test(phone)
  }

  const validateEmailFormat = (email: string) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
  }

  // switch (QuestionField.type) {
  //   case 'stringQuestion':
  //     return <StringQuestion question={question} />
  // }

  return (
    <View style={{ marginBottom: 40, marginTop: 100 }}>
      <P1 style={{ marginLeft: 20, marginBottom: 20 }}>
        {props.question.text}
      </P1>
      {props.question.type === 'RadioButtonsQuestion' && (
        <InputRadio
          choices={props.question.choices!}
          onChange={props.onChange}
        />
      )}
      {(props.question.type === 'StringQuestion' ||
        props.question.type === 'EmailQuestion' ||
        props.question.type === 'NumberQuestion') && (
        <PrettyInputBase
          type={props.question.type}
          placeholder={props.question.placeholder}
          onKeyDown={keyDownHandler}
          value={props.answer || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}
    </View>
  )
}

interface QuestionFieldProps {
  question: Question
  answer: string
  onChange(answer: string): void
}
