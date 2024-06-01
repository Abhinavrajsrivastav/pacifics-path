import React, { useState } from 'react';
import axios from 'axios';
import './Videos.css';
import { useLocation } from 'react-router-dom';

const Videos = () => {

  const location = useLocation();
  let query = location.state?.query || ''; // Provide a default empty string if query is undefined
  console.log('Query:', query);

  const [prompt, setPrompt] = useState(query);
  const [videos, setVideos] = useState([]);
  const API_KEY = 'AIzaSyAkzRrReqaS8Pv2oZ6BNHe1arZ7L7E4fnM'; // Replace 'YOUR_API_KEY' with your actual API key

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

 const searchYouTubeVideos = async () => {
  try {
    let nextPageToken = ''; // Initialize nextPageToken
    let fetchedVideos = []; // Initialize fetchedVideos array

    // Fetch videos until we have at least 15 videos or there are no more pages
    while (fetchedVideos.length < 25 && nextPageToken !== undefined) {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${prompt}&type=video&videoDuration=long&pageToken=${nextPageToken}`
      );
      
      // Add fetched videos to the array
      fetchedVideos = fetchedVideos.concat(response.data.items);

      // Update nextPageToken for fetching the next page of results
      nextPageToken = response.data.nextPageToken;
    }

    // Set the videos state with the fetched videos
    setVideos(fetchedVideos);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
  }
};



  const handleSubmit = (event) => {
    event.preventDefault();
    searchYouTubeVideos();
  };

  return (
   <div className="Video-response">
     <div className="videos-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter prompt for YouTube videos"
          value={prompt}
          onChange={handlePromptChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="video-list">
        {videos.length > 0 && videos.map((video) => (
  <div key={video.id.videoId} className="video-card">
    {/* <h3 className="video-title">{video.snippet.title}</h3> */}
    <iframe
      width="460"
      height="200"
      src={`https://www.youtube.com/embed/${video.id.videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="video-player"
    ></iframe>
  </div>
))}

      </div>
    </div>
   </div>
  );
};

export default Videos;
