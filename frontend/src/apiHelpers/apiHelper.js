import axios from "axios";

export const getAllMovies = async () => {
  console.log("fetching movies");
  let response;
  try {
    response = await axios
      .get("/movie")
      .catch((err) => console.log("err in axios"));

    if (response.status !== 200) {
      return console.log("No data");
    }
  } catch (error) {
    console.log("error is ", error);
  }
  const data = await response.data;
  // console.log(data);
  return data;
};
export const sendUserAuthRequest = async (data, signup) => {  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log("err in uerAuth"));
  if (res.status !== 200 && res.status !== 201) {
    console.log("error occured in userAuth");
  }
  const response = await res.data;
  console.log(response, "from api");
  return response;
};

export const sendAdminAuthRequest = async(data)=>{
  const res = await axios.post("/admin/login",{
    email:data.email,
    password:data.password
  }).catch((err)=>console.log("err in admin auth"))
  if(res !==200){
    return console.log("unexpected err")
  }
  const response = await res.data
  return response
}
export const getMovieDetails =async (id)=>{
 const res = await  axios.get(`movie/${id}`).catch((err)=>console.log("err in movie details"))
 if(res.status !==  200){
  return console.log("err in api of movie details")
 }
 const resData = await res.data;
 return resData;
}


export const newBooking = async(data) =>{
  const res = awaitaxios.post("/booking",{
    movie:data.movie,
    seatNumber:data.seatNumber,
    date:data.date,
    user:localStorage.getItem("userId")

  }).catch((err)=>console.log(err))
  if(res.status !== 200){
    return console.log("unexpected err")
  }
  const resData = await res.data
  return resData;
}
export const getUSerBooking = async(data)=>{
  const id = localStorage.getItem("userId")
  const res = await axios.get(`/user/booking/${id}`).catch(err=>console.log(err))
  if(res.status !== 200){
    return console.log("unexpectd err")
}
  const resData = await res.data
  return resData;

}