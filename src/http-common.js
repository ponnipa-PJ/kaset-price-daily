import axios from "axios";

export default axios.create({
  baseURL: "https://dataapi.moc.go.th",

  headers: {
    "Content-type": "application/json",
  }
});