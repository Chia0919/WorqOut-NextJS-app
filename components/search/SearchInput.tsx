import InputBase from '@material-ui/core/InputBase'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import React, { useState } from 'react'
import Fuse from 'fuse.js'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      marginTop: '12px',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#f2f2f2',
      '&:hover': {
        backgroundColor: fade('#f2f2f2', 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
)

export default function SearchInput(props) {
  const classes = useStyles()
  const {
    graphqlQuery,
    search,
    setTextSearch,
    setSearch,
    fusejs,
    fusekeys,
  } = props
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={e => {
          if (fusejs) {
            const options = {
              shouldSort: true,
              findAllMatches: true,
              threshold: 0.2,
              location: 0,
              distance: 100,
              maxPatternLength: 32,
              minMatchCharLength: 1,
              keys: fusekeys,
            }

            const fuse = new Fuse(graphqlQuery, options)

            const result = fuse.search(e.target.value)

            setTextSearch(result)
          } else {
            const testSearch = graphqlQuery.filter(v => {
              return (v?.name)
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            })

            setTextSearch(testSearch)
          }
          setSearch(e.target.value)
        }}
      />
    </div>
  )
}
