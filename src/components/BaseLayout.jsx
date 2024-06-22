import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <div>
        <Header />
        <div className="main-content">
            <div className="container">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default BaseLayout