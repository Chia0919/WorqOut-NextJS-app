import {
  Avatar,
  Card,
  Chip,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import Notes from '@material-ui/icons/Notes'
import React from 'react'
import useStyles from '../styles/useStyles'
interface Props {
  title: string
  subtitle: string
  total: string
  days: string
  onclick: any
}
export default function WorkoutListItem(props: Props) {
  const classes = useStyles({})
  const { total, title, subtitle, days, onclick, ...rest } = props

  return (
    <Card
      variant="outlined"
      className={classes.card}
      style={{ padding: '0px 12px' }}
      {...rest}
    >
      <ListItem
        button
        dense
        style={{ background: 'white', paddingLeft: '0px' }}
      >
        <ListItemIcon>
          <Avatar>
            <Notes />
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <div style={{ display: 'flex' }}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ fontWeight: 600 }}
                  noWrap
                >
                  {title}
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ flex: 1, textAlign: 'right' }}
                >
                  <Chip
                    size="small"
                    label={days}
                    color="secondary"
                    style={{ height: '18px' }}
                  />
                </Typography>
              </div>
              <Typography color="primary" style={{ fontSize: '12px' }}>
                {total}
              </Typography>
            </>
          }
          secondary={subtitle}
          secondaryTypographyProps={{
            variant: 'h6',
            style: { fontSize: '10px', fontWeight: 500 },
            noWrap: true,
          }}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            edge="end"
            aria-label="arrow"
            onClick={onclick}
          >
            <MoreVert />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Card>
  )
}
