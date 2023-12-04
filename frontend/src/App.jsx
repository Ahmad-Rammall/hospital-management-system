import SignInPage from '../src/pages/signin/SignIn'
import AdminPage from '../src/pages/AdminPage/AdminPage'
import DoctorPage from './pages/doctorPage/DoctorPage'
import PatientPage from './pages/PatientPage/PatientPage'
import { BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignInPage />}/>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/doctor' element={<DoctorPage />}/>
          <Route path='/patient' element={<PatientPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
