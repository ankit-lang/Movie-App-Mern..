import React, { useEffect, useState } from "react";
import { getUSerBooking } from "../../apiHelpers/apiHelper";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
const Profile = () => {
  const [booking, setBooking] = useState();
  useEffect(() => {
    getUSerBooking()
      .then((res) => setBooking(res.booking))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Box width={"100%"} display={"flex"}>
        <Box
          width={"30%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >

        {/* <AccountCircleIcon/>  */}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
