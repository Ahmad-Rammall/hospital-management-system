import SignInPage from '../src/pages/signin/SignIn'
import { BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignInPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
