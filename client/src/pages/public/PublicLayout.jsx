import React from "react"
import{Outlet} from "react-router-dom"
import {Navigation, TopHeader} from '~/components'

function PublicLayout() {
  return (
    <main>
      <TopHeader/>
      <Navigation/>
      <div>
        <Outlet/>
      </div>
    </main>
  )
}

export default PublicLayout