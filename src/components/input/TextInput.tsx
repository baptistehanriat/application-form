import styled from 'styled-components'
import { Colors } from '../style/colors'

export const TextInput = styled.input`
  font-family: Inter;
  font-size: 16px;
  height: 50px;
  max-width: 450px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  padding: 0 20px 0 20px;
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
