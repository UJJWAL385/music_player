import React, { useEffect, useState } from 'react'
import './player.css'
import { useLocation } from 'react-router-dom'
import apiClient from '../../spotify.js'
import SongCard from '../../components/songCard/songCard.js'
import Queue from '../../components/queue/queue.js'
import AudioPLayer from '../../components/audioplayer/audioPlayer.js'
import Widgets from "../../components/widgets/widgets.js";

const Player = () => {

  const location = useLocation()
  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)


  useEffect(() => {
    if (location.state) {
      apiClient
        .get('playlists/' + location.state?.id + '/tracks')
        .then((res) => {
          setTracks(res.data.items)
          setCurrentTrack(res.data.items[0].track)
        })
    }
    
  
  }, [location.state])
  

  console.log(tracks)

useEffect(() => {
  setCurrentTrack(tracks[currentIndex]?.track)

}, [currentIndex, tracks])


  return (
    <div className='screen-container  flex'>
      <div className='left-player-body'>
        <AudioPLayer
            currentTrack={currentTrack}
            total={tracks}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className='right-player-body'>
          <SongCard album = {currentTrack?.album}/>
          <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  )
}

export default Player
