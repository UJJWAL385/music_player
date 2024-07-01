import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Favourites from '../favourites/favourites.js';
import Feed from '../feed/feed.js';
import Trending from '../trending/trending.js';
import Player from '../player/player.js';
import Library from '../library/library.js';
import './home.css'
import Sidebar from '../../components/sidebar/sidebar.js'
import Login from '../auth/login.js';
import { setClientToken } from '../../spotify.js';
 
const Home = () => {

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    const hash = window.location.hash

    window.location.hash = ""

    if(!token && hash) {
      const _token = hash.split("&")[0].split("=")[1]
      window.localStorage.setItem("token", _token);
      setToken(_token)
      setClientToken(_token)
    }else{
      setToken(token)
      setClientToken(token)
    }

    

  }, [])
  
  return (
    !token ? 
    < Login /> :
    <Router>
      <div className='main-body'>
        
        <Sidebar />
        <Routes>
            <Route path='/' element={<Library />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/trending' element={<Trending />} />
            <Route path='/player' element={<Player />} />
            <Route path='/favourites' element={<Favourites />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Home
