import styled from 'styled-components'
import { Colors } from './colors'

export const H1 = styled.h1`
  font-family: Jost;
  font-weight: 700;
  font-size: 64px;
  line-height: 130%;
  margin: 0;
  color: #1f2937;
`

export const P1 = styled.p`
  font-family: Jost;
  font-weight: 600;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: -0.2px;
  margin: 0;
  color: ${Colors.Grey800};
`

export const Hint = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.2px;
  color: ${Colors.Grey800};
`
