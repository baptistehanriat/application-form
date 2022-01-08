import { cp } from 'fs'
import React, { useState } from 'react'
import styled, { CSSProperties } from 'styled-components'
import ButtonBack from './components/button/ButtonBack'
import ButtonPrimary from './components/button/ButtonPrimary'
import { PrettyInputBase } from './components/input/InputBase'
import FlexView from './components/layout/FlexView'
import View from './components/layout/View'
import { Colors } from './components/style/colors'
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

  console.log(answers)
  return (
    <Container>
      <InnerContainer>
        {questionnaireStatus === 'ready' && (
          <>
            <H1 style={{ marginBottom: 50 }}>Ready to join us ? 🚀</H1>
            <View style={{ alignItems: 'flex-end' }}>
              <ButtonPrimary
                label="Start"
                onClick={() => {
                  setQuestionnaireStatus('ongoing')
                }}
              />
            </View>
          </>
        )}
        {questionnaireStatus === 'ongoing' && (
          <>
            <View style={{ flexDirection: 'row' }}>
              <ButtonBack style={{ marginRight: 40 }} onClick={onGoBack} />
              <ProgressBar questions={tenantQuestionnaire} />
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
    }
  }

  const validateEmailFormat = (email: string) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
  }

  return (
    <View style={{ marginBottom: 40, marginTop: 100 }}>
      <P1 style={{ marginLeft: 20, marginBottom: 20 }}>
        {props.question.text}
      </P1>
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

function ProgressBar(props: { questions: Question[] }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
      }}
    >
      {props.questions.map((question, index) => {
        const isExtremity = index === props.questions.length - 1
        return (
          <View
            key={question.answerKey}
            style={{
              flexDirection: 'row',
              flex: isExtremity ? 0 : 1,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 24,
                width: 24,
                zIndex: 2,
                transform: 'rotate(45deg)',
                backgroundColor: Colors.Primary500,
              }}
            />
            {!isExtremity && (
              <View
                style={{
                  height: 2,
                  flex: 1,
                  zIndex: 1,
                  width: '100%',
                  backgroundColor: Colors.Primary500,
                }}
              ></View>
            )}
          </View>
        )
      })}
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
  max-width: 450px;
`

export default App
