import React from 'react'
import HeaderClient from '../../components/HeaderClient/Index'
import { Outlet } from 'react-router-dom'

const ClientHome = () => {
  return (
    <>
    <HeaderClient></HeaderClient>
    <Outlet></Outlet>
    </>
  )
}

export default ClientHome