import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({title,releaseDate,posterUrl,id}) => {

  return (
    <div>
     <Card sx={{ margin:2,width:240,height:320,borderRadius:5,":hover":{
        boxShadow:"10px 10px 10px #ccc"
      } }}>
        <CardActionArea>
          <img height={'50%'} width={'100%'}  src={posterUrl} alt={title} />
          <CardContent>
            <Typography>{title}</Typography>
            <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button LinkComponent={Link} to={`/booking/${id}`} size="small" sx={{margin:'auto'}} >Book</Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default MovieItem;
