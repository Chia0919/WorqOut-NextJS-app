import { InputBase } from '@material-ui/core'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import React, { useState } from 'react'

interface Props {
  search: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      display: 'flex',
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
const Search = (props: Props) => {
  const classes = useStyles({})
  const { search } = props
  const [searchValue, setSearchValue] = useState('')

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value)
  }

  const resetInputField = () => {
    setSearchValue('')
  }

  const callSearchFunction = e => {
    e.preventDefault()
    search(searchValue)
    resetInputField()
  }

  return (
    <form className="search">
      <div className={classes.search}>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={handleSearchInputChanges}
        />
        <div className={classes.searchIcon}>
          <SearchIcon onClick={callSearchFunction} type="submit" />
        </div>
      </div>
    </form>
  )
}

export default Search
