import React,{useState,useEffect} from "react";
import YoutubeEmbed from "./Youtube";
import { useHttpClient } from "../../shared/hooks/useHttpClient";
import { useParams } from "react-router-dom";

const Video = ()=> {
    const li=useParams().li;

    return (
    
    <YoutubeEmbed  embedId={li}/>
        
    );
}



export default Video;