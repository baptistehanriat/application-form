import React from 'react'
import View from '../layout/View'
import { Question } from '../questionnaire/types'
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
        let status: 'undone' | 'ongoing' | 'done' = 'undone'
        if (index === props.currentIndex) {
          status = 'ongoing'
        } else if (index < props.currentIndex) {
          status = 'done'
        }
        return (
          <View
            key={question.answerKey}
            style={{
              flexDirection: 'row',
              flex: isExtremity ? 0 : 1,
              alignItems: 'center',
            }}
          >
            <Dot status={status} />
            <Line status={status} />
          </View>
        )
      })}
    </View>
  )
}

function Line(props: { status: 'undone' | 'ongoing' | 'done' }) {
  return (
    <View
      className="ease-out-animation"
      style={{
        height: 2,
        flex: 1,
        zIndex: 1,
        width: '100%',
        backgroundColor:
          props.status === 'done' ? Colors.Primary500 : Colors.Grey100,
      }}
    />
  )
}

function Dot(props: { status: 'undone' | 'ongoing' | 'done' }) {
  return (
    <View
      className="ease-out-animation"
      style={{
        height: 24,
        width: 24,
        zIndex: 2,
        transform: 'rotate(45deg)',
        backgroundColor:
          props.status === 'done' ? Colors.Primary500 : Colors.Grey100,
        border:
          props.status === 'ongoing'
            ? `2px solid ${Colors.Primary500}`
            : `0px solid ${Colors.Grey100}`,
      }}
    />
  )
}
