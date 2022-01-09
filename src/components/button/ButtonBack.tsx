import styled from 'styled-components'
import ChevronLeft from '../icon/ChevronLeft'
import { Colors } from '../style/colors'

export default function ButtonBack(props: {
  style?: React.CSSProperties
  onClick?(): void
}) {
  return (
    <Container style={props.style} onClick={props.onClick}>
      <ChevronLeft color={Colors.Grey800} />
    </Container>
  )
}

const Container = styled.button`
  height: 50px;
  width: 50px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  background-color: white;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0px;
  padding-top: 3px;
  padding-right: 3px;
  cursor: pointer;
  border: none;
  :hover {
    background-color: ${Colors.Slate100};
  }
`
