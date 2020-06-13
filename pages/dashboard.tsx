import React from 'react'

import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
import { ContentWrapper, Wrapper } from '../components/wrapper/wrapper'
import Footer from '../components/footer/Footer'
import { useTheme, useMediaQuery } from '@material-ui/core'
export default function Dashboard() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })

  return (
    <Layout module="Dashboard">
      <Wrapper>
        {isDesktop === false ? <Footer /> : null}
        <EmptyMsg title={'Coming Soon'} />
      </Wrapper>
    </Layout>
  )
}
