import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Home } from './pages/Home'
import { Login } from './pages/auth/Login'
import { VerifyOTP } from './pages/auth/VerifyOTP'
import { CompleteProfile } from './pages/auth/CompleteProfile'
import { DashboardLayout } from './layouts/DashboardLayout'
import Dashboard from './pages/dashboard'
import Drivers from './pages/dashboard/Drivers'
import Trucks from './pages/dashboard/Trucks'
import { GetApp } from './pages/Home/getApp'
// import MediaStreamPage from './pages/MediaStreamPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>} >
            
            <Route index path="/" element={<Home/>} />
            <Route path='/register' element={<Login/>}/>
            <Route path='/verify' element={<VerifyOTP/>}/>
            <Route path='/complete-profile' element={<CompleteProfile/>}/>
            <Route path="/get-started" element={<GetApp/>} />

            <Route path="/dashboard" element={<DashboardLayout/>}>
              <Route index element={<Dashboard/>}/>
              <Route path="drivers" element={<Drivers/>} />
              <Route path="trucks" element={<Trucks/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
