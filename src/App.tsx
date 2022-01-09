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
      setAnswers({})
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
              style={{ alignSelf: 'center' }}
              label="Start now"
              onClick={() => {
                setQuestionnaireStatus('ongoing')
              }}
            />
          </>
        )}
        {questionnaireStatus === 'ongoing' && (
          <>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <ButtonBack style={{ marginRight: 40 }} onClick={onGoBack} />
              <ProgressBar
                currentIndex={index}
                questions={tenantQuestionnaire}
              />
            </View>
            <View style={{ flex: 2 }}>
              <QuestionField
                onChange={onChange}
                answer={answers[currentQuestion.answerKey]}
                question={currentQuestion}
              />
              <ButtonPrimary
                style={{ alignSelf: 'flex-end' }}
                label={
                  index === tenantQuestionnaire.length - 1 ? 'Submit' : 'Next'
                }
                onClick={onGoNext}
              />
            </View>
          </>
        )}
        {questionnaireStatus === 'finished' && (
          <>
            <H1 style={{ marginBottom: 20 }}>All done! 🎉</H1>
            <P1>Here is a recap of the information you filled!</P1>
            {tenantQuestionnaire.map((question) => (
              <View
                key={question.answerKey}
                style={{
                  margin: '20px 0 0px 0',
                  flexDirection: 'row',
                }}
              >
                <Marker />
                <View>
                  <P1 style={{ color: Colors.Grey600 }}>{question.text}</P1>
                  <P1 style={{ fontWeight: 600 }}>
                    {answers[question.answerKey]}
                  </P1>
                </View>
              </View>
            ))}
            <ButtonPrimary
              onClick={() => {
                setQuestionnaireStatus('ready')
                setAnswers({})
                setIndex(0)
              }}
              style={{ alignSelf: 'center', marginTop: 50 }}
              label="Start over"
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

  @media (min-width: 992px) {
    min-width: 450px;
  }

  @media (max-width: 992px) {
    min-width: 100%;
  }
`

const Marker = styled(View)`
  background-color: ${Colors.Primary500};
  width: 2px;
  margin-right: 20px;
`
export default App
