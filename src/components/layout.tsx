import React from 'react'
import styled from 'styled-components'

import { ColorCode } from '../constants/colors'

const ResponsiveWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr min(960px, 80%) 1fr;
  align-items: center;
  background-color: ${ColorCode.MAIN_BG_COLOR};

  main {
    grid-column: 2;
  }
`

export const Layout = ({ children }: LayoutProps) => {
  return <ResponsiveWrapper>{children}</ResponsiveWrapper>
}

type LayoutProps = {
  children: JSX.Element
}