import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonBack from './components/button/ButtonBack'
import ButtonPrimary from './components/button/ButtonPrimary'
import { PrettyInputBase } from './components/input/InputBase'
import View from './components/layout/View'
import { H1, P1 } from './components/style/texts'

interface Question {
  text: string
  type: 'shortString' | 'email' | 'phoneNumber' | 'budget'
  answerKey: string
}

function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [index, setIndex] = useState(0)

  const [questionnaireStatus, setQuestionnaireStatus] = useState<
    'ready' | 'ongoing' | 'finished'
  >('ready')

  const onChange = (answer: string) => {
    const currentQuestion = tenantQuestionnaire[index]
    setAnswers({
      ...answers,
      [currentQuestion.answerKey]: answer,
    })
  }

  const onGoNext = () => {
    if (index === tenantQuestionnaire.length - 1) {
      setQuestionnaireStatus('finished')
    } else {
      // const nextQuestion = tenantQuestionnaire[index + 1]
      setIndex(index + 1)
    }
  }

  const onGoBack = () => {
    if (index === 0) {
      setQuestionnaireStatus('ready')
    } else {
      // const previousQuestion = tenantQuestionnaire[index - 1]
      setIndex(index - 1)
    }
  }

  const tenantQuestionnaire: Question[] = [
    {
      text: "What's your full name ?",
      type: 'shortString',
      answerKey: 'nameAnswerKey',
    },
    {
      text: "What's your email ?",
      type: 'email',
      answerKey: 'emailAnswerKey',
    },
    {
      text: "What's your phone number ?",
      type: 'phoneNumber',
      answerKey: 'phoneAnswerKey',
    },
    {
      text: 'Select your budget',
      type: 'budget', // At some point we can have one generic for this one
      answerKey: 'budgetAnswerKey',
    },
  ]

  return (
    <Container>
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
          <ButtonBack onClick={onGoBack} />
          <QuestionField
            onChange={onChange}
            answer={answers[tenantQuestionnaire[index].answerKey]}
            question={tenantQuestionnaire[index]}
          />
          <ButtonPrimary label="Next" onClick={onGoNext} />
        </>
      )}
      {questionnaireStatus === 'finished' && (
        <>
          <P1>Questionnaire Finished</P1>
        </>
      )}
    </Container>
  )
}

function QuestionField(props: QuestionFieldProps) {
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      // props.onChange()
    }
  }

  const validateEmailFormat = (email: string) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
  }

  return (
    <View>
      <P1>{props.question.text}</P1>
      <PrettyInputBase
        type="email"
        placeholder="toto"
        onKeyDown={keyDownHandler}
        value={props.answer || ''}
        onChange={(e) => props.onChange(e.target.value)}
      ></PrettyInputBase>
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
`

export default App
