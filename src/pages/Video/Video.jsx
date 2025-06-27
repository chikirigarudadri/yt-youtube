import React from 'react';

import './Video.css'
import RecommendVideo from '../../Components/Recommendvideo/RecommendVideo';
import PlayVideo from '../../Components/Playvideo/Playvideo';
import { useParams } from 'react-router-dom';
const Video = () => {

 const {videoId,categoryId} = useParams();
  

  return (
    <div className="play-container">

<PlayVideo videoId ={videoId}/>

      <RecommendVideo categoryId={categoryId}/>

    </div>
  )
}

export default Video;
