import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonPrimary from './components/button/ButtonPrimary'
import InputBase, { PrettyInputBase } from './components/input/InputBase'
import View from './components/layout/View'
import { H1, P1 } from './components/style/texts'

interface Question {
  text: string
  type: 'fullName' | 'email' | 'phoneNumber' | 'budget'
}

interface Answer {
  value: string
}

function App() {
  const [answers, setAnswers] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [start, setStart] = useState(false)
  const onComplete = (answer: string) => {
    setAnswers([...answers, answer])
    setIndex(index + 1)
  }

  const onGoBack = () => {
    // remove the last answer
    setAnswers([])
    setIndex(index - 1)
  }

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
  console.log(answers)
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
      ) : (
        <>
          <QuestionField
            onComplete={onComplete}
            text={tenantQuestionnaire[index].text}
          />
        </>
      )}
    </Container>
  )
}

interface KeyboardEvent {
  enterKey: boolean
}

function QuestionField(props: {
  text: string
  onComplete(answer: string): void
}) {
  const [answer, setAnswer] = useState('')

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      props.onComplete(answer)
      setAnswer('')
    }
  }

  const validateEmailFormat = (email: string) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
  }

  console.log(validateEmailFormat(answer))
  return (
    <View>
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
          props.onComplete(answer)
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
