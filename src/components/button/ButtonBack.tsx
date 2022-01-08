import styled from 'styled-components'
import ChevronLeft from '../icon/ChevronLeft'
import { Colors } from '../style/colors'
import { P1 } from '../style/texts'

export default function ButtonBack(props: { onClick?(): void }) {
  return (
    <Container onClick={props.onClick}>
      <ChevronLeft color={Colors.Grey800} />
    </Container>
  )
}

const Container = styled.button`
  height: 40px;
  width: 40px;
  box-shadow: 0px 48px 100px 0px rgba(17, 12, 46, 0.15);
  background-color: white;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
  border: none;

  :hover {
    background-color: ${Colors.Slate100};
  }
`
