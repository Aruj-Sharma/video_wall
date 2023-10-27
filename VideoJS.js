import React, { useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import videojs from "!video.js";
import 'video.js/dist/video-js.css';
import './App.css'

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  const [mouseInactive, setMouseInactive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);


let timeout = null;
let timeoutId =null;
const handleMouseMove = () => {
  clearTimeout(timeout);
  if(mouseInactive){
  playerRef?.current?.play();
setMouseInactive(false);
}  
  timeout = setTimeout(() => {
    playerRef?.current?.pause();
    setMouseInactive(true)
  }, 60000); 
};


document.addEventListener('mousemove', handleMouseMove);

const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
  console.log("in")
    timeoutId = setTimeout(() => {
      playerRef?.current?.pause();
    }, 10000); 
  } else {  
    clearTimeout(timeoutId);
    playerRef?.current?.play();  
  }
};

document.addEventListener('visibilitychange', handleVisibilityChange);

  React.useEffect(() => {

    if (!playerRef.current) {
    
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);

      });

    } else {
      const player = playerRef.current;
      

      player.autoplay(options.autoplay);
      player.src(options.sources);

    
    
      //setTimeout(()=>{player.pause();},500)
    }

    
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player?.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  React.useEffect(() => {
    const player = playerRef.current;
   player?.on('timeupdate', function () {  
    console.log(player.currentTime()) 
      if (player.currentTime() >= 102 && player.currentTime() <= 102.06 ) {
        console.log(isPlaying)
        player.pause();
      }
    });


  }, [options, videoRef, isPlaying]);


  return (<div style={{display:"flex",flexDirection:"column", width: "100%",height: "100%",padding:"4px"}}>
    <div data-vjs-player style={{width: "100%", padding:"2px"}}  onClick={()=>{playerRef.current.requestFullscreen()}}>
      <div ref={videoRef} style={{width: "100%",height: "100%"}}/>
     
    </div>
     <div>
     <button onClick={()=>{playerRef?.current?.play();}}>Play</button>
     <button onClick={()=>{playerRef?.current?.pause();}}>Pause</button>
   </div>

   </div>

  );
}

export default VideoJS;