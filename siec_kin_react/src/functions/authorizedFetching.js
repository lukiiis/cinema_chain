import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const authorizedGet = async (token) =>{
    const decodedToken = jwtDecode(token);
    const userLogin = decodedToken.sub;
    try{
        const url = `http://localhost:8090/api/v1/private/userdetails/${userLogin}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.status===200){
            console.log(response.data);
            console.log("Request succesfull");
            return response;
        }
        else if(response.status===403){
            console.log("Access forbidden");
        }
        else{
            console.log("unexpected error", response.status);
        }
        return response;
    }
    catch(error){
        console.error("Error while fetching data", error);
        return null;
    }
}