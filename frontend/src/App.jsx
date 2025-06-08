import { useContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat.jsx';
import AuthUser from './pages/AuthUser.jsx';
import MainLoader from './helpers/MainLoader.jsx';
import SetAvatar from './pages/SetAvatar.jsx'
import { UserContext } from './contexts/UserContext.jsx'
import { FriendContext } from './contexts/FriendContext.jsx';
import Profile from './pages/Profile.jsx';

function App() {
const {authUser, isCheckingAuth,getUser} = useContext(UserContext);

useEffect(()=>{
  getUser();
},[])

if(isCheckingAuth && !authUser){
  return (
    <>
    <MainLoader/>
    </>
  )
}
  return (
    <>
    
      <Routes>
        <Route path='/authuser' exact element={!authUser ? <AuthUser />: <Navigate to='/' />}></Route>
        <Route path='/setavatar' exact element={authUser ? <SetAvatar />: <Navigate to='/authuser' />}></Route>
        <Route path='/' exact element={authUser ? <Chat />: <Navigate to='/authuser' />}></Route>
        <Route path='/profile' exact element={authUser ? <Profile />: <Navigate to='/authuser' />}></Route>
      </Routes>
    </>
  )
}

export default App
