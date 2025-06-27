import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes ,Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Video from './pages/Video/Video'


const App = () => {

const[sidebar,setsideBar]=useState(true);


  return (
    <>
      <Navbar setsideBar={setsideBar}/>

      <Routes>
        <Route path='/'element={<Home sidebar = {sidebar}/>}/>
         <Route path='/video/:categoryId/:videoId' element={<Video/>}/>

      </Routes>


    </>
  )
}

export default App
