import axios from "axios";

export const api = axios.create({
    baseURL:"http://10.138.138.136:3333/",
});