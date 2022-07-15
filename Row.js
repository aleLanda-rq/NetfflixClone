import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";



const base_url="https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
const [movies, setMovies] = useState([]);
const [trailerURL, setTrailerUrl] = useState("");


useEffect(() =>{
async function fetchData(){
const request= await axios.get(fetchUrl);
setMovies(request.data.results)
return request;

} 
fetchData()
}, [fetchUrl])

const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const handleClick= (movie) =>{
   if(trailerURL){
    setTrailerUrl("");//when you click on it again if there is a trailerURl it will close
   } else{
    movieTrailer(movie?.name || "")
    .then((url) => {
      const urlParams= new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v")); //this gets everything after the "query" in the url so the parameter for the right movie
    })
    .catch(error => console.log(error))
   }
}  

  return (
    <div className='row'>
      <h2>{title}</h2> 
      <div className='row_posters'>
        {/*several row poster */}

        {movies.map(movie=>(
            <img 
            key={movie.id}
            onClick={()=>handleClick(movie)} 
            className={`row_poster ${isLargeRow && "row_posterlarge"}`}
             src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path }`} 
              alt={movie.name}/>
        ))}

      </div>
     { trailerURL && <Youtube videoID={trailerURL} opts={opts}/>}
    </div>
  )
}

export default Row
