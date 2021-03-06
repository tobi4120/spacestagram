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

    // Change isLoading to false
    setIsLoading(false);
    setPostLoading(false);
  }

  if (isLoading) 
    return <div style={{ height: '100vh'}}><Loader /></div>

  return (
    <div className="App">

      <div className="page-header">
        <h1 className="nasa-heading">Spacestagram</h1>
        <p className="credit">Brought to you by NASA's image API</p>
      </div>

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
    </div>
  );
}

export default Home;
