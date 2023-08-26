import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../apiHelpers/apiHelper";
import MovieItem from "./MovieItem";

const Movie = () => {
  const [movies,setMovies] = useState([])
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log("err in movies"))
  },[])
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        textAlign={"center"}
        variant="h4"
        width={`50%`}
        margin={'auto'}
        p={2}
        color={'white'}
        bgcolor={"#900c3f"}
      >
       All Movies
      </Typography>
      <Box width={'100%'}
      margin={'auto'}
      marginTop={5}
      display={'flex'}
      justifyContent={'flexStart'}
      flexWrap={'wrap'}

       >
      
        {movies && movies.map((movie,index)=>(
          <MovieItem
              key={index}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              id={movie._id}
            />
        ))}

       </Box>
    </Box>
  );
};

export default Movie;
