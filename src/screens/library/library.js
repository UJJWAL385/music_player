import React, { useState, useEffect } from 'react';
import APIkit from '../../spotify.js';
import './library.css'
import { IconContext} from 'react-icons'
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    APIkit.get('me/playlists').then(response => {
      setPlaylists(response.data.items);
      console.log(response.data); // this should work now
    });
  }, []);

  const navigate = useNavigate()

const playPlaylist = (id) => {
  navigate("/player", {state: { id: id} })
}

  return (
    <div className='screen-container'>
      <div className='library-body' >
      
          {playlists?.map((playlist) => 
            (<div className='playlist-card' 
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)} >
              <img src={playlist.images[0].url} alt='playlist-image' className='playlist-img' />
              <p className='playlist-title'>{playlist.name}</p>
              <p className='playlist-track-total'>{playlist.tracks.total}</p>
              <div className='playlist-fade'>
                <IconContext.Provider value={{size:"50px", color: "#E99D72" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </div>
              </div>)
          )}
      
      </div>
    </div>
  );
};

export default Library;