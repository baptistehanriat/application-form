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
  box-shadow: 0px 48px 100px 0px rgba(17, 12, 46, 0.15);
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
