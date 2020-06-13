import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/layout/layout'
import { Wrapper } from '../../components/wrapper/wrapper'

export default function WorkoutDetil() {
  const router = useRouter()
  const { workoutId } = router.query
  console.log(workoutId)
  return (
    <Layout module="workout detail">
      <Wrapper>detail</Wrapper>
    </Layout>
  )
}
