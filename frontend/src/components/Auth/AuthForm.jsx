import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const labelStyle = { mt: 1, mb: 1 };

const AuthForm = ({onSubmit,isAdmin}) => {
  const [isSignUp, setSignUp] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  };
  const handleSubmit =(e)=>{
    e.preventDefault()

    onSubmit({input,signup:isAdmin ? false : isSignUp})

  }

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", p: 1 }}>
        <IconButton>
          <CloseIcon></CloseIcon>
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignUp ? "SignUp" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit} >
        <Box
          display={"flex"}
          p={6}
          justifyContent={"center"}
          alignContent={"center"}
          width={400}
          m={"auto"}
          flexDirection={"column"}
        >
          {  !isAdmin && isSignUp && (
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                m={"normal"}
                value={input.name}
                onChange={(e) => handleChange(e)}
                variant="standard"
                type="text"
                name="name"
              />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            m={"normal"}
            value={input.email}
            onChange={(e) => handleChange(e)}
            variant="standard"
            type="email"
            name="email"
          />
          <FormLabel sx={labelStyle}>password</FormLabel>
          <TextField
            m={"normal"}
            value={input.password}
            onChange={(e) => handleChange(e)}
            variant="standard"
            type="password"
            name="password"
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            fullWidth
          >
            {isSignUp ? "SignUp" : "Login"}
          </Button>
        { !isAdmin && <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            fullWidth
            onClick={() => setSignUp(!isSignUp)}
          >
            Switch to {isSignUp ? "Login" : "SignUp"}
          </Button>}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
