import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../components/footer/Footer'
import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
import Search from '../components/search/Search'
import useStyles from '../components/styles/useStyles'
import { Wrapper } from '../components/wrapper/wrapper'

export default function FoodNutrition() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })
  const classes = useStyles({})

  const [responseData, setResponseData] = useState()

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
        'x-rapidapi-key': '80a2763ed3msh8f645dfd49e7039p105ed4jsn09394a9f8256',
      },

      params: {
        language_code: 'en',
        ingr: 'Chicken rice',
      },
    })
      .then(response => {
        setResponseData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  console.log(responseData)
  const search = (searchValue: any) => {
    axios({
      method: 'GET',
      url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
        'x-rapidapi-key': '80a2763ed3msh8f645dfd49e7039p105ed4jsn09394a9f8256',
      },

      params: {
        language_code: 'en',
        ingr: searchValue,
      },
    })
      .then(response => {
        setResponseData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <Layout module="Food Nutrition">
      <Wrapper>
        <Grid container justify="flex-start" className={classes.gridCard}>
          <Grid item xs={12} md={3} lg={3}>
            <Card variant="outlined" className={classes.card}>
              <Search search={search} />
            </Card>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            {responseData?.hints?.length === 0 || responseData === undefined ? (
              <Card variant="outlined" className={classes.card}>
                <EmptyMsg
                  title="No Data"
                  subtitle="Please enter and click on search button to view your food nutrition."
                />
              </Card>
            ) : null}
            {responseData?.hints?.map((item, index) => (
              <Card key={index} variant="outlined" className={classes.card}>
                <CardContent>
                  <div style={{ width: '100%', display: 'flex' }}>
                    <Typography color="primary" variant="h6" gutterBottom>
                      {item.food.label}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: '12px',
                        flex: 1,
                        textAlign: 'right',
                        color: '#5271ff',
                      }}
                    >
                      Category:
                      <Typography
                        color="textPrimary"
                        component="span"
                        style={{ fontSize: '12px', paddingLeft: '4px' }}
                      >
                        {item.food.categoryLabel}
                      </Typography>
                    </Typography>
                  </div>
                  <Typography className={classes.colorText} color="textPrimary">
                    Ingredients:
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ fontSize: '12px' }}
                  >
                    {item.food.foodContentsLabel || 'None'}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: '12px',
                      color: '#5271ff',
                      marginTop: '10px',
                    }}
                    color="textPrimary"
                  >
                    Nutrition Fact:
                  </Typography>
                  <Typography
                    key={index}
                    variant="body2"
                    component="div"
                    style={{ fontSize: '12px' }}
                  >
                    <Grid container justify="flex-start">
                      <Grid item xs={3}>
                        Calories
                        <Typography
                          className={classes.colorText}
                          color="textPrimary"
                        >
                          {item.food.nutrients.ENERC_KCAL?.toFixed(2)} g{' '}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        carbs
                        <Typography
                          className={classes.colorText}
                          color="textPrimary"
                        >
                          {item.food.nutrients.CHOCDF?.toFixed(2)}g
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        Fat
                        <Typography
                          className={classes.colorText}
                          color="textPrimary"
                        >
                          {item.food.nutrients.FAT?.toFixed(2)}g
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        Protein
                        <Typography
                          className={classes.colorText}
                          color="textPrimary"
                        >
                          {item.food.nutrients.PROCNT?.toFixed(2)}g
                        </Typography>
                      </Grid>
                    </Grid>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>

        {isDesktop === false ? <Footer /> : null}
      </Wrapper>
    </Layout>
  )
}
