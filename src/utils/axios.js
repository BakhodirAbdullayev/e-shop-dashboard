import axios from "axios";

export const instance = axios.create({
  baseURL: "http://3.19.30.204/api/",
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});
