import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Book from '@material-ui/icons/Book'
import Timeline from '@material-ui/icons/Timeline'
import React from 'react'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})
interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Typography component="div">{children}</Typography>}
    </div>
  )
}
interface Props {
  tabOne: any
  tabTwo: any
}
export default function FixedTabs(props: Props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const { tabOne, tabTwo } = props
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Weight" icon={<Timeline />} />
        <Tab label="Daily Calories" icon={<Book />} />
        {/* <Tab label="Item Three" /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        {tabOne}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tabTwo}
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        Item Two
      </TabPanel> */}
    </div>
  )
}
