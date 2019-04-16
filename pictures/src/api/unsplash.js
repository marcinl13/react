import axios from "axios";

export default axios.create({
  baseURL :'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID 1abd2cfa35dfdd0965871d8dbacc1814fd56ce03b48e3a3461a5449b7fcca64a'
  }
})