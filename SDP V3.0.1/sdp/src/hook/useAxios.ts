import axios from 'axios';
import { SYSTEM_KEY } from '../config/Constent';

export const UseAxios = <T = any>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any, params?: any) => {
  
const BASE_URL = "http://localhost:3000/api";
const ENDPOINT = `${BASE_URL}/${url}`;
 
const fetchData = async () => {
    try {
        const response : T = await axios({
            url: ENDPOINT,
            method: method,
            data: data,
            params: params,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN)}`,
            },
        }

      );
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
 
return fetchData();
};
