import { useState } from 'react'
import styled from 'styled-components'
import View from '../layout/View'
import { Colors } from '../style/colors'
import { Hint } from '../style/texts'

export default function InputBase(props: InputBaseProps) {
  const [value, setValue] = useState('')
  return (
    <View style={{ width: '100%' }}>
      <PrettyInputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Hint>{props.hint}</Hint>
    </View>
  )
}

interface InputBaseProps {
  hint?: string
  onComplete(value: string): void
}

export const PrettyInputBase = styled.input`
  font-family: Jost;
  font-size: 16px;
  height: 50px;
  max-width: 450px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  padding: 0 10px 0 10px;
  color: ${Colors.Grey800};
  background-color: ${Colors.White};
  box-sizing: border-box;
  border-radius: 0px;
  ::placeholder {
    color: ${Colors.Grey100};
    opacity: 1;
  }
  :focus {
    border: 2px solid ${Colors.Primary500};
    outline: none;
  }
`
