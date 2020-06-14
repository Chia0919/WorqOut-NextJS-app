import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import theme from '../components/theme'
import '../global.css'
import { Provider } from 'mobx-react'
import { useStore } from '../store'

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  // const apolloClient = useApollo(pageProps.initialApolloState)
  const store = useStore(pageProps.initialState)
  console.log(store, 'app_')
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>WorqOut - Simple workout tracker log</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  )
}
