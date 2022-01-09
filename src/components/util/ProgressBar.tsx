import React from 'react'
import styled from 'styled-components'
import { Question } from '../../App'
import View from '../layout/View'
import { Colors } from '../style/colors'

export default function ProgressBar(props: {
  questions: Question[]
  currentIndex: number
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      {props.questions.map((question, index) => {
        const isExtremity = index === props.questions.length - 1
        console.log('index, CurrentIndex', index, props.currentIndex)
        return (
          <View
            key={question.answerKey}
            style={{
              flexDirection: 'row',
              flex: isExtremity ? 0 : 1,
              alignItems: 'center',
            }}
          >
            {index < props.currentIndex && (
              <>
                <DotDone />
                <LineDone />
              </>
            )}
            {index === props.currentIndex && (
              <>
                <DotFocus />
                <Line />
              </>
            )}
            {index > props.currentIndex && (
              <>
                <Dot />
                <Line />
              </>
            )}
          </View>
        )
      })}
    </View>
  )
}

const Line = styled(View)`
  height: 2px;
  flex: 1;
  z-index: 1;
  width: 100%;
  background-color: ${Colors.Grey100};
`

const LineDone = styled(Line)`
  background-color: ${Colors.Primary500};
`

const Dot = styled(View)`
  height: 24px;
  width: 24px;
  z-index: 2;
  transform: rotate(45deg);
  background-color: ${Colors.Grey100};
`

const DotFocus = styled(Dot)`
  border: 2px solid ${Colors.Primary500};
`

const DotDone = styled(Dot)`
  background-color: ${Colors.Primary500};
`
