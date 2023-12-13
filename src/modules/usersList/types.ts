import React from "react"
export interface IUser {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

export type UserType = {
  key: React.Key
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
  company: string;
}
