import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonBack from './components/button/ButtonBack'
import ButtonPrimary from './components/button/ButtonPrimary'
import { PrettyInputBase } from './components/input/InputBase'
import InputRadio from './components/input/InputRadio'
import View from './components/layout/View'
import { Colors } from './components/style/colors'
import { H1, P1 } from './components/style/texts'
import ProgressBar from './components/util/ProgressBar'

interface QuestionBase {
  text: string
  answerKey: string
}
// | 'emailInput' | 'numberInput' | 'radioButtons'
interface StringQuestion extends QuestionBase {
  type: 'StringQuestion'
  placeholder?: string // used for any xxxInput
}
interface EmailQuestion extends QuestionBase {
  type: 'EmailQuestion'
  placeholder?: string // used for any xxxInput
}
interface NumberQuestion extends QuestionBase {
  type: 'NumberQuestion'
  placeholder?: string // used for any xxxInput
}
interface RadioButtonsQuestion extends QuestionBase {
  type: 'RadioButtonsQuestion'
  placeholder?: string // used for any xxxInput
  choices: { key: string; text: string }[]
}

export type Question =
  | StringQuestion
  | EmailQuestion
  | NumberQuestion
  | RadioButtonsQuestion

function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [index, setIndex] = useState(0)

  const [questionnaireStatus, setQuestionnaireStatus] = useState<
    'ready' | 'ongoing' | 'finished'
  >('ready')

  const tenantQuestionnaire: Question[] = [
    {
      text: "What's your full name ?",
      type: 'StringQuestion',
      answerKey: 'nameAnswerKey',
      placeholder: 'John Doe',
    },
    {
      text: "What's your email ?",
      type: 'EmailQuestion',
      answerKey: 'emailAnswerKey',
      placeholder: 'john@doe.com',
    },
    {
      text: "What's your phone number ?",
      type: 'NumberQuestion',
      answerKey: 'phoneAnswerKey',
      placeholder: '123456789',
    },
    {
      text: 'Some hint on your salary.',
      type: 'RadioButtonsQuestion',
      choices: [
        { key: 'key1', text: '0 - 1.000' },
        { key: 'key2', text: '1.000 - 2.000' },
        { key: 'key3', text: '2.000 - 3.000' },
        { key: 'key4', text: '3.000 - 4.000' },
        { key: 'key5', text: 'Over 4.000' },
      ],
      answerKey: 'budgetAnswerKey',
    },
  ]

  const currentQuestion = tenantQuestionnaire[index]

  const onChange = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.answerKey]: answer,
    })
  }

  const onGoNext = () => {
    if (index === tenantQuestionnaire.length - 1) {
      setQuestionnaireStatus('finished')
    } else {
      setIndex(index + 1)
    }
  }

  const onGoBack = () => {
    if (index === 0) {
      setQuestionnaireStatus('ready')
    } else {
      setIndex(index - 1)
    }
  }

  return (
    <Container>
      <InnerContainer>
        {questionnaireStatus === 'ready' && (
          <>
            <H1 style={{ marginBottom: 50 }}>Ready to join us ? 🚀</H1>
            <ButtonPrimary
              label="Start"
              onClick={() => {
                setQuestionnaireStatus('ongoing')
              }}
            />
          </>
        )}
        {questionnaireStatus === 'ongoing' && (
          <>
            <View style={{ flexDirection: 'row' }}>
              <ButtonBack style={{ marginRight: 40 }} onClick={onGoBack} />
              <ProgressBar
                currentIndex={index}
                questions={tenantQuestionnaire}
              />
            </View>

            <QuestionField
              onChange={onChange}
              answer={answers[currentQuestion.answerKey]}
              question={currentQuestion}
            />
            <ButtonPrimary label="Next" onClick={onGoNext} />
          </>
        )}
        {questionnaireStatus === 'finished' && (
          <>
            <H1>All done!</H1>
            <P1>Here is a recap of the information you filled!</P1>
            {Object.values(answers).map((answer) => (
              <P1 key={answer}>{answer}</P1>
            ))}
            <ButtonPrimary
              onClick={() => {
                setQuestionnaireStatus('ready')
                setAnswers({})
                setIndex(0)
              }}
              label="Start again"
            />
          </>
        )}
      </InnerContainer>
    </Container>
  )
}

function QuestionField(props: QuestionFieldProps) {
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

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${Colors.Slate100};
`

const InnerContainer = styled(View)`
  flex: 1;
  justify-content: center;
  width: 450px; // use breakpoint CSS
`

export default App
