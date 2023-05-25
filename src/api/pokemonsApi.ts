import axios from "axios";

const pokemonsApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

export default pokemonsApi;
