import React from 'react'
/**
 * @param MenuOption
 * handle moreoption icon on listing page
 */
export const useMenuOption = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [menu, setMenu] = React.useState({ id: '', index: 0 })
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
    index: number
  ) => {
    setAnchorEl(event.currentTarget)
    setMenu({ id, index })
    console.log(id)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return {
    anchorEl,
    menu,
    handleClick,
    handleClose,
  }
}
