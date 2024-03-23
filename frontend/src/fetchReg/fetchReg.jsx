import axios from "axios"; 

const baseURL = import.meta.env.VITE_BASEURL;

export const getAllData = async () => {
  try{
    const res = await axios.get(`${baseURL}/api/userRegs`);
    console.log("aaaa")
    return res.data; 
  } catch (error) {
    console.log(error);
    console.log("SSSS")
  }
};