import React from 'react'

import Navbar from '../../components/adminPage/navbar/navbar'
import ManageDoctors from '../../components/adminPage/ManageDoctors/ManageDoctors'

function AdminPage() {
  return (
    <div>
      <Navbar />
      <ManageDoctors />
    </div>
  )
}

export default AdminPage