import React, { useEffect, useState } from 'react';
import './PlayVideo.css'
import Video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import save from '../../assets/save.png'
import share from '../../assets/share.png'
import user_profile from '../../assets/user_profile.jpg'
import dislike from '../../assets/dislike.png'
import jack from '../../assets/jack.png'
import { api_key, convert_data } from '../../Data';
import { data, useParams } from 'react-router-dom';
import moment from 'moment';


const Playvideo = () => {

    const{videoId} = useParams();
const [apiData,SetapiData] = useState(null);
const [channelData,Setchanneldata] = useState(null);
const [commnetdata,SetcommentData] = useState([]);

//fetching the videodata
const fetchvideo = async () => {

    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${api_key}`;

    await fetch(video_url).then(response =>response.json()).then(apiData => SetapiData(apiData.items[0]))

}

useEffect(()=>{

    fetchvideo();
}
,[videoId])

//fetching the channel data
const fetchchanneldata = async () =>{

    const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${api_key}`;
    await fetch(channel_url).then(response =>response.json()).then(channelData => Setchanneldata(channelData.items[0]))

    //fetching the comment data

const comment_url = ` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${api_key}`;
await fetch(comment_url).then(response => response.json()).then(data => SetcommentData(data.items))

}

 
useEffect(()=>{

fetchchanneldata();

},[apiData])

//fetching the comment data

  return (
    <div className="Play-Video">
        {/* <video src={Video1} controls muted loop autoPlay></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"title here"}</h3>
        <div className="Play-Video-Info">
        <p>{apiData?convert_data(apiData.statistics.viewCount):"6k"} &bull;{moment(apiData?apiData.snippet.publishedAt:"0 days").fromNow()}</p>
        <div>
            <span><img src={like} alt="" />{apiData?convert_data(apiData.statistics.likeCount):500}</span>
            <span><img src={dislike} alt="" />Dislike</span>
            <span><img src={share} alt="" />Share</span>
            <span><img src={save} alt="" />Save</span> 
        </div>
        </div>
        <hr/>
        <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:" "} alt=""/>
        <div>
            <p>{apiData?apiData.snippet.channelTitle:"title here"}</p>
            <span>{channelData?convert_data(channelData.statistics.subscriberCount):""} Subscribes</span>
        </div>

        <button>Subscribe</button>
        </div>  
        <div className="Vid-Description">
            <p>{apiData?apiData.snippet.description.slice(0,250):"description"} </p>
            {/* <p>{apiData?apiData.snippet.tags:"tag"}</p> */}
            <hr />
            <h4>{apiData?apiData.statistics.commentCount:500} Comments</h4>
            {commnetdata.map((items,index) => {


            return(

             <div key={index} className="comment">
                <img src={items.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                <h3>{items.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(items.snippet.topLevelComment.snippet.publishedAt).fromNow()}&bull;</span></h3>

            

                <p>{items.snippet.topLevelComment.snippet.textOriginal}
                </p>

                <div className="comment-action">
                <img src={like} alt="" />
                <span>{items.snippet.topLevelComment.snippet.likeCount} likes</span>
                <img src={dislike} alt="" />
                </div>
                </div>   
            </div>

                    )
            })}


            


            </div>
        </div>
  )
}

export default Playvideo;
