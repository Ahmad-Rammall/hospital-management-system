import React from 'react'

import Navbar from '../../components/adminPage/navbar/navbar'
import ManageDoctors from '../../components/adminPage/ManageDoctors/ManageDoctors'
import ManagePatients from '../../components/adminPage/ManagePatients/ManagePatients'

function AdminPage() {
  return (
    <div>
      <Navbar />
      {/* <ManageDoctors /> */}
      <ManagePatients />
    </div>
  )
}

export default AdminPage