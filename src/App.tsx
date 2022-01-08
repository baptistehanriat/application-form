import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonBack from './components/button/ButtonBack'
import ButtonPrimary from './components/button/ButtonPrimary'
import { PrettyInputBase } from './components/input/InputBase'
import View from './components/layout/View'
import { H1, P1 } from './components/style/texts'

interface Question {
  text: string
  type: 'fullName' | 'email' | 'phoneNumber' | 'budget'
}

function App() {
  const [answers, setAnswers] = useState<string[]>([])
  const [previousAnswer, setPreviousAnswer] = useState('')
  const [index, setIndex] = useState(0)
  const [start, setStart] = useState(false)
  const [end, setEnd] = useState(false)

  const onGoNext = (answer: string) => {
    const newAnswers = [...answers, answer]
    console.log(newAnswers)
    setAnswers(newAnswers)
    setPreviousAnswer(newAnswers[index])
    if (index === tenantQuestionnaire.length - 1) {
      setEnd(true)
    } else {
      setIndex(index + 1)
    }
    console.log('answersNext', answers)
  }

  const onGoBack = () => {
    console.log('answersBack', answers)
    if (index === 0) {
      setStart(false)
    } else {
      setIndex(index - 1)
    }
  }

  console.log(answers)
  const tenantQuestionnaire: Question[] = [
    {
      text: "What's your full name ?",
      type: 'fullName',
    },
    {
      text: "What's your email ?",
      type: 'email',
    },
    {
      text: "What's your phone number ?",
      type: 'phoneNumber',
    },
    {
      text: 'Select your budget',
      type: 'budget',
    },
  ]

  return (
    <Container>
      {!start ? (
        <>
          <H1 style={{ marginBottom: 50 }}>Ready to join us ? 🚀</H1>
          <ButtonPrimary
            label="Start"
            onClick={() => {
              setStart(true)
            }}
          />
        </>
      ) : !end ? (
        <>
          <QuestionField
            answers={answers}
            savedAnswer={previousAnswer}
            onGoBack={onGoBack}
            onGoNext={onGoNext}
            text={tenantQuestionnaire[index].text}
          />
        </>
      ) : (
        <>
          <P1>Questionnaire Finished</P1>
          {answers.map((answer) => {
            return <P1 key={answer}>{answer}</P1>
          })}
        </>
      )}
    </Container>
  )
}

function QuestionField(props: {
  text: string
  answers: string[]
  savedAnswer: string
  onGoBack(): void
  onGoNext(answer: string): void
}) {
  const [answer, setAnswer] = useState(props.savedAnswer)
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      props.onGoNext(answer)
      setAnswer('')
    }
  }

  const validateEmailFormat = (email: string) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
  }

  console.log('this is my answers', props.answers)
  return (
    <View>
      <ButtonBack onClick={props.onGoBack} />
      <P1>{props.text}</P1>
      <PrettyInputBase
        type="email"
        placeholder="toto"
        onKeyDown={keyDownHandler}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></PrettyInputBase>
      <ButtonPrimary
        label="Next"
        onClick={() => {
          props.onGoNext(answer)
          setAnswer('')
        }}
      />
    </View>
  )
}

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-left: 15px;
  padding-right: 15px;
`

export default App
