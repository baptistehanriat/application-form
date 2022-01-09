import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonBack from './components/button/ButtonBack'
import ButtonPrimary from './components/button/ButtonPrimary'
import View from './components/layout/View'
import QuestionField from './components/questionnaire/QuestionField'
import { Question } from './components/questionnaire/types'
import { Colors } from './components/style/colors'
import { H1, P1 } from './components/style/texts'
import ProgressBar from './components/util/ProgressBar'

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
      text: 'In what range your salary would be?',
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
  width: 450px; // FIXME: use CSS breakpoint
`

export default App
