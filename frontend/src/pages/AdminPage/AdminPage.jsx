import React, { useState } from 'react'

import './admin.css'

import ManageDoctors from '../../components/adminPage/ManageDoctors/ManageDoctors'
import ManagePatients from '../../components/adminPage/ManagePatients/ManagePatients'

function AdminPage() {
  const [manageDoctors , setManageDoctors] = useState(false)
  const [managePatients , setManagedPatients] = useState(false)

  const openPatientsSection = () => {
    setManagedPatients(!managePatients)
    setManageDoctors(false)
  }

  const openDoctorsSection = () => {
    setManagedPatients(false)
    setManageDoctors(!manageDoctors)
  }

  return (
    <div>
      <div className="flex nav-container">
        <div className={manageDoctors ? 'nav-item selected' : 'nav-item'} onClick={openDoctorsSection} >Manage Doctors</div>
        <div className={managePatients ? 'nav-item selected' : 'nav-item'} onClick={openPatientsSection}>Manage Patients</div>
        <div className="nav-item">Rooms Reservations</div>
      </div>

      {manageDoctors ? <ManageDoctors /> : ''}
      {managePatients ? <ManagePatients /> : ''}
    </div>
  )
}

export default AdminPage