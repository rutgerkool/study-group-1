import { type Person } from '../types/types'

export const fetchUser = async (): Promise<Person> => {
  return await fetch('https://randomuser.me/api/')
    .then(async response => await response.json())
    .then(data => {
      return data.results[0]
    })
    .catch(err => { throw err })
}

export const handleEmailClick = (email: string): void => {
  window.open(`mailto:${email}`)
}

export const handlePhoneClick = (phoneNumber: string): void => {
  window.open(`tel:${phoneNumber}`)
}

export const handleLocationClick = (location: { city: string, country: string, street: { name: string, number: string } }): void => {
  const streetName = location.street.name.split(' ').join('+')
  const streetNumber = location.street.number
  const city = location.city
  const country = location.country
  window.open(`https://www.google.com/maps/search/${streetName}+${streetNumber},+${city},+${country}`)
}
