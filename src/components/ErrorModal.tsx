import React from 'react'
import { IconButton } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { profileStyles } from '../styles/styles'

export const ErrorModal = (): JSX.Element => {
  return (
    <IconButton sx={ profileStyles }>
      <ErrorOutlineIcon fontSize='large'/>
      Something went wrong
    </IconButton>
  )
}
