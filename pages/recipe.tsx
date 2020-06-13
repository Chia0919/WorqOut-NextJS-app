import { useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import Footer from '../components/footer/Footer'
import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
import { Wrapper } from '../components/wrapper/wrapper'
import axios from 'axios'
export default function FoodRecipe() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })
  let [responseData, setResponseData] = React.useState('')
  console.log(process.env.REACT_APP_API_KEY)
  // React.useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url:
  //       'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/2322/summary',
  //     headers: {
  //       'content-type': 'application/octet-stream',
  //       'x-rapidapi-host':
  //         'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  //       'x-rapidapi-key': '80a2763ed3msh8f645dfd49e7039p105ed4jsn09394a9f8256',
  //     },
  //     params: {
  //       language_code: 'en',
  //     },
  //   })
  //     .then(response => {
  //       setResponseData(response.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }, [responseData])
  return (
    <Layout module="Food Recipe">
      <Wrapper>
        {isDesktop === false ? <Footer /> : null}
        <EmptyMsg title={'Coming Soon'} />
      </Wrapper>
    </Layout>
  )
}
