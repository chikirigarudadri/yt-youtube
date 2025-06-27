import React, { useEffect, useState } from 'react';

import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'



import './RecommendVideo.css'
import { api_key, convert_data } from '../../Data';
import { Link } from 'react-router-dom';

import moment from 'moment';
const RecommendVideo = ({categoryId}) => {

    const[apiData,SetapiData] = useState([]);

const recommend_video = async() =>{

const recomded_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${api_key}`;
await fetch(recomded_url).then(Response => Response.json()).then(data => SetapiData(data.items))

}

useEffect(() =>{

recommend_video();


},[])



  return (
   <div className="Recommend">
    {apiData.map((item,index) =>{


        return(
            
    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="Side-video-list">
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <div className="Video-Info">
            <h3>{item.snippet.title}</h3>
            <p>{item.snippet.channelTitle}</p>
            <p>{convert_data(item.statistics.viewCount)} &bull;{moment(item.snippet.publishedAt).fromNow()}</p>
        </div>
    </Link>

    )
    }


        


)}



    <div className="Side-video-list">
        <img src={thumbnail2} alt="" />
        <div className="Video-Info">
            <h3>Best Channel Ever</h3>
            <p>The Graet Ever Melody Songs</p>
            <p>1294k views &bull;</p>
        </div>
    </div>

    <div className="Side-video-list">
        <img src={thumbnail3} alt="" />
        <div className="Video-Info">
            <h3>Best Channel Ever</h3>
            <p>The Graet Ever Melody Songs</p>
            <p>1256k views &bull;</p>
        </div>
    </div>

    <div className="Side-video-list">
        <img src={thumbnail4} alt="" />
        <div className="Video-Info">
            <h3>Best Channel Ever</h3>
            <p>The Graet Ever Melody Songs</p>
            <p>1280k views &bull;</p>
        </div>
    </div>

   </div>
  )
}

export default RecommendVideo;
