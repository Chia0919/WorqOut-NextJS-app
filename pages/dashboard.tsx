import React from 'react'

import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
import { ContentWrapper, Wrapper } from '../components/wrapper/wrapper'
export default function Dashboard() {
  return (
    <Layout module="Dashboard">
      <Wrapper>
        <ContentWrapper header="Dashboard" onclick={() => alert('back')} />
        <EmptyMsg title={'Coming Soon'} />
      </Wrapper>
    </Layout>
  )
}
