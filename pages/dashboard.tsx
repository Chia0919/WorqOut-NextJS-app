import React from 'react'

import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
export default function Dashboard() {
  return (
    <Layout module="Dashboard">
      <EmptyMsg title={'Coming Soon'} />
    </Layout>
  )
}
