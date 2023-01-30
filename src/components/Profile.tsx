import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { type Person } from '../types/types'
import { fetchUser, handleEmailClick, handleLocationClick, handlePhoneClick } from '../utils/utils'
import { profileStyles } from '../styles/styles'
import { ErrorModal } from './ErrorModal'

import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import PlaceIcon from '@mui/icons-material/Place'

import './Profile.css'

const GenderIcon = ({ gender }: { gender: string }): JSX.Element => {
  return gender === 'male' ? <MaleIcon fontSize='inherit'/> : <FemaleIcon fontSize='inherit'/>
}

const Profile = (): JSX.Element => {
  const [userData, setUserData] = useState<Person | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const setNewUserData = (): void => {
    setLoading(true)
    fetchUser().then(data => {
      setUserData(data)
      setLoading(false)
    }).catch(err => {
      setError(true)
      setLoading(false)
      console.log(err)
    })
  }

  useEffect(() => {
    setNewUserData()
  }, [])

  if (loading) {
    return <CircularProgress sx={ profileStyles }/>
  }

  if (error) {
    return <ErrorModal />
  }

  if (userData !== null) {
    return (
      <Card variant="outlined" sx={ profileStyles }>
        <CardMedia sx={{ marginTop: '2rem' }}>
          <img style={{ borderRadius: '50%' }} src={userData.picture.large} />
        </CardMedia>
        <CardContent>
          <h2>{userData.name.first} {userData.name.last}, {userData.dob.age} <GenderIcon gender={userData.gender}/></h2>
        </CardContent>
        <CardActions>
          <IconButton aria-label="send email" onClick={() => { handleEmailClick(userData.email) }}>
            <EmailIcon />
          </IconButton>
          <IconButton aria-label="call" onClick={() => { handlePhoneClick(userData.phone) }}>
            <PhoneIcon />
          </IconButton>
          <IconButton aria-label="search location" onClick={() => { handleLocationClick(userData.location) }}>
            <PlaceIcon />
          </IconButton>
        </CardActions>
        <Button onClick={setNewUserData}>
          Load new user
        </Button>
      </Card>
    )
  } else {
    return <ErrorModal />
  }
}

export default Profile
