import React from 'react'
import styled from 'styled-components'
import { Colors } from '../style/colors'
import ButtonBase, { ButtonBaseProps } from './ButtonBase'

export default function ButtonPrimary(props: ButtonBaseProps) {
  if (props.status === 'disabled') {
    return <ButtonPrimaryDisabled {...props} labelColor={Colors.Grey100} />
  } else {
    return <ButtonPrimaryActive {...props} labelColor={Colors.White} />
  }
}

const ButtonPrimaryActive = styled(ButtonBase)`
  background-color: ${Colors.Primary500};
  :hover {
    background-color: ${Colors.Primary600};
  }
`

const ButtonPrimaryDisabled = styled(ButtonBase)`
  background-color: ${Colors.Grey100};
  border: 1px solid ${Colors.Grey800};
`
