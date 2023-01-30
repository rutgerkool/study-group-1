import { Card, CardActions, CardContent, CardMedia, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import PlaceIcon from '@mui/icons-material/Place'
import './Profile.css'

interface Person {
  gender: string
  name: {
    first: string
    last: string
  }
  location: {
    street: {
      number: string
      name: string
    }
    city: string
    country: string
  }
  email: string
  dob: {
    age: number
  }
  phone: string
  picture: {
    large: string
  }
}

const fetchUser = async (): Promise<Person> => {
  return await fetch('https://randomuser.me/api/')
    .then(async response => await response.json())
    .then(data => {
      return data.results[0]
    })
    .catch(err => { return err })
}

const Profile = (): JSX.Element => {
  const [userData, setUserData] = useState<Person | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    fetchUser().then(data => {
      setUserData(data)
      setLoading(false)
    }).catch(err => { console.log(err) })
  }, [])

  if (loading) return <></>

  if (userData !== null) {
    return (
      <Card variant="outlined" sx={{ maxWidth: '300px', maxHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', margin: 'auto', top: 0, right: 0, bottom: 0, left: 0 }}>
        <CardMedia sx={{ marginTop: '2rem' }}>
          <img style={{ borderRadius: '50%' }} src={userData.picture.large} />
        </CardMedia>
        <CardContent>
          <h2>{userData.name.first} {userData.name.last}, {userData.dob.age} {userData.gender === 'male' ? <MaleIcon fontSize='inherit'/> : <FemaleIcon fontSize='inherit'/>}</h2>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites" onClick={() => window.open(`mailto:${userData.email}`)}>
            <EmailIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={() => window.open(`tel:${userData.phone}`)}>
            <PhoneIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={() => window.open(`https://www.google.com/maps/search/${userData.location.street.name.split(' ').join('+')}+${userData.location.street.number},+${userData.location.city},+${userData.location.country}`)}>
            <PlaceIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  } else {
    return (
      <h1>Something went wrong</h1>
    )
  }
}

export default Profile
