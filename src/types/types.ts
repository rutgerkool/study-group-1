export interface Person {
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
