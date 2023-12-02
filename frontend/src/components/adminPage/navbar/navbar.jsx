import React from 'react'

import './navbar.css'

function navbar() {
  return (
    <div className='flex center nav-container'>
        <div>Manage Doctors</div>
        <div>Manage Patients</div>
        <div>Rooms Reservations</div>
    </div>
  )
}

export default navbar