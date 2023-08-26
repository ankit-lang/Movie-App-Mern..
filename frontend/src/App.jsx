import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Admin from './components/Admin/Admin.jsx'
import Movie from './components/Movie/Movie.jsx'
import Home from './components/Home'
import Auth from './components/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { adminActions, userActions } from './components/store'
import Booking from './components/Booking/Booking'
import Profile from './components/Profile/UserProfile'

function App() {

  const isAdminLoggedIn = useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(()=>{

    if(localStorage.getItem('userId')){
      dispatch(userActions.login())
    }else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login())
    }


  },[])


  return (
    <>
      <Header/>
      <section>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/movies' element={<Movie/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/booking/:id' element={<Booking/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </section>
    </>
  )
}

export default App
