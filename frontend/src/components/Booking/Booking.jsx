import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../apiHelpers/apiHelper";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs,setInput] = useState({
    seatNumber:"",
    date:""
  })
  const id = useParams().id;
  useEffect(() => {
    getMovieDetails(id)
      .then((data) => setMovie(data.movie))
      .catch((err) => console.log("err occured"));
  }, [id]);
  const handleChange = (e)=>{
    setInput((prevState) =>( {...prevState,[e.target.name]:e.target.value}))
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs)
    newBooking({...inputs,movie:movie._id,}).then(res=>console.log).catch(err=>console.log(err))

  }

  return (
    <>
      {movie && (
        <>
          <Typography
            variant="h4"
            p={3}
            fontFamily={"fantasy"}
            textAlign={"center"}
          >
            Book Tickets of Movie {movie[0].title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
           
              marginRight={"auto"}
              flexDirection={"column"}
              pt={3}
              width={"50%"}
            >
              <img
                width={"80%"}
                height={"200px"}
                src={movie[0].posterUrl}
                alt={movie[0].title}
              />
              <Box width={"80%"} mt={3} p={2}>
                <Typography pt={2}>{movie[0].description}</Typography>
                <Typography fontWeight={"bold"} mt={1}>
                  Starter:
                  {movie[0].actors.map((items, index) => " " + items + " ")}
                </Typography>
                <Typography mt={1} fontWeight={"bold"}>
                  {new Date(movie[0].releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} pt={3}>
              <form onSubmit={handleSubmit} >
                <Box p={5} m={"auto"} display={"flex"} flexDirection={"column"}>
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                  onChange={(e)=>handleChange(e)}
                    name="seatNumber"
                    value={inputs.seatNumber}
                    type="Number"
                    margin="normal"
                    variant="standard"
                  ></TextField>
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                  onChange={(e)=>handleChange(e)}
                  value={inputs.date}
                    name="date"
                    type="date"
                    margin="normal"
                    variant="standard"
                  ></TextField>
                  <Button type="submit" sx={{mt:3}} > Book Now</Button>
                </Box>
              </form>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Booking;
