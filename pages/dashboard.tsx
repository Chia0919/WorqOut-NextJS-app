import { useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import Footer from '../components/footer/Footer'
import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
import { Wrapper } from '../components/wrapper/wrapper'

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
