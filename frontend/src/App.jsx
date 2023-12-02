import SignInPage from '../src/pages/signin/SignIn'
import AdminPage from '../src/pages/AdminPage/AdminPage'
import { BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignInPage />}/>
          <Route path='/admin' element={<AdminPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
