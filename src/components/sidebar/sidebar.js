import React, {useState, useEffect} from 'react'
import './sidebar.css'
import avatar from '../../assets/ReadyPlayerMe-Avatar.png'
import SidebarButton from './sidebarButton.js'
import { FaSignOutAlt } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import apiClient from '../../spotify.js';

export default function Sidebar() {

  const [image, setImage] = useState(avatar)

  useEffect(() => {
    apiClient.get("me").then(response => {
      const profile = response.data;
      if (profile.images && profile.images.length > 0) {
        const imageUrl = profile.images[0].url;
        setImage(imageUrl);
        console.log(imageUrl);
      } else {
        console.log("No profile image found");
      }
    });
  }, [])

  // const handleImgError = (e) => {
  //   e.target.src = image; // display the default image if the profile image is not available
  // };
  

  return (
    <div className='sidebar-container'>
      <img src={image}
      className='profile-img'
      alt='profile'
      // onError={handleImgError}
      />

      <div className='sidebar-button'>
        < SidebarButton title='Feed' to="/feed" icon={<MdSpaceDashboard />}/>
        < SidebarButton title='Trending' to="/trending" icon={<FaGripfire />}/>
        < SidebarButton title='Player' to="/player" icon={<FaPlay />}/>
        < SidebarButton title='Favourites' to="/favourites" icon={<MdFavorite />}/>
        < SidebarButton title='Library' to="/" icon={<MdLibraryAddCheck />}/>
      </div>
      < SidebarButton title='' to="" icon={<FaSignOutAlt />}/>
    </div>
  )
}
