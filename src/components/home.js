import { useEffect, useState } from 'react';
import axios from 'axios';
import { api_key } from "./api_key";

function Home() {
  useEffect(() => {
    get_images();
  }, [])

  const get_images = async () => {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
          count: 10,
          api_key: api_key()
      },  
    })

    console.log(response)
  }

  return (
    <div className="App">
      <h1>Spacestagram</h1>
    </div>
  );
}

export default Home;
