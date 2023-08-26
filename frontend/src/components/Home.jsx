import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import img1 from "../assets/img1.png";
import MovieItem from "./Movie/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../apiHelpers/apiHelper";

const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log("err in home"));
  }, []);

  return (
    <Box width={"100vw"} height={"100vh"} margin={"2 auto"}>
      <Box margin={"auto"} width={"80%"} p={2} height={"40vh"}>
        <img src={img1} width={"100%"} height={"100%"} alt="none" />
      </Box>
      <Box p={5} m={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Release
        </Typography>
      </Box>

      <Box
        display={"flex"}
        margin={"auto"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {movies &&
          movies.slice(0,4).map((movie, index) => (
            <MovieItem
              key={index}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              id={movie._id}
            />
          ))}
      </Box>

      <Box p={5} m={"auto"} display={"flex"}>
        <Button
          LinkComponent={Link}
          to="movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
