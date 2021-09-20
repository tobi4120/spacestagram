import { useEffect, useState } from 'react';
import axios from 'axios';
import { api_key } from "./api_key";
import Loader from "./page_elements/loader"
import Post from "./post";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    get_images();
  }, [])

  // Function to get images from Nasa API
  const get_images = async () => { 

    setPostLoading(true);

    // Call API
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
          count: 10,
          api_key: api_key()
      },  
    })

    // Store the images in a useState variable called posts
    setPosts(oldArray => [...oldArray, ...response.data])
    console.log(response.data)

    // Change isLoading to false
    setIsLoading(false);
    setPostLoading(false);
  }

  if (isLoading) 
    return <Loader />

  return (
    <div className="App">
      <h1>Spacestagram</h1>

      {/* Posts */}
      <div className="posts">
        {posts.map((post, index) => {

          if (posts.length === index + 1) {

            // Add the prop 'lastPost' to track the last post 
            return <Post 
                      key={index} 
                      post={post} 
                      lastPost={true} 
                      get_images={get_images}
                      postLoading={postLoading} /> 
          }
          return (
            <Post 
              key={index} 
              post={post} 
              lastPost={false} 
              get_images={get_images} 
              postLoading={postLoading}/>
          )
        })}

        <div>{postLoading && <Loader />}</div>
      </div>

      <button onClick={() => get_images()}>Load more</button>

    </div>
  );
}

export default Home;
