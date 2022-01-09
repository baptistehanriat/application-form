import View from '../layout/View'
import { CSSProperties, ReactNode, useState } from 'react'
import { Colors } from '../style/colors'
import { P1 } from '../style/texts'

interface InputRadioProps {
  choices: Array<{ key: string; text: string }>
  onChange(value: string): void
  defaultValue?: string
  minWidth?: number
  label?: string
  style?: CSSProperties
}

export default function InputRadio(props: InputRadioProps) {
  const [checkedValue, setCheckedValue] = useState(props.defaultValue)
  return (
    <View style={props.style}>
      {props.choices.map((value) => (
        <View
          key={value.key}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: '8px 0 8px 0',
          }}
        >
          <Checkbox
            checked={value.key === checkedValue}
            onClick={() => {
              setCheckedValue(value.key)
              props.onChange(value.text)
            }}
          >
            <P1 style={{ marginLeft: 15, textAlign: 'left' }}>{value.text}</P1>
          </Checkbox>
        </View>
      ))}
    </View>
  )
}

function Checkbox(props: {
  checked: boolean
  onClick(): void
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      style={{
        ...props.style,
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        cursor: 'pointer',
      }}
    >
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          border: `3px solid ${Colors.Primary500}`,
          flex: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <View
          className="ease-out-animation"
          style={{
            width: 18,
            flex: 'none',
            height: 18,
            opacity: props.checked ? 1 : 0,
            transform: props.checked ? 'scale(1)' : 'scale(0.5)',
            backgroundColor: Colors.Primary500,
          }}
        />
      </View>
      {props.children}
    </button>
  )
}
