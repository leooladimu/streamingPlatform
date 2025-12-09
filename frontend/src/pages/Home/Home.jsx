import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import VideoRow from '../../components/VideoRow/VideoRow';
import './Home.css';

const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [featuredRes, trendingRes, recsRes] = await Promise.all([
        api.get('/videos/featured'),
        api.get('/videos/trending'),
        api.get('/recommendations')
      ]);

      setFeatured(featuredRes.data[0]);
      setTrending(trendingRes.data);
      setRecommendations(recsRes.data);

      // Fetch videos by genre
      const genreList = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
      const genreData = {};
      
      for (const genre of genreList) {
        const res = await api.get(`/videos/genre/${genre}`);
        genreData[genre] = res.data;
      }
      
      setGenres(genreData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddToList = async (videoId) => {
    try {
      // Optimistically update the UI
      const updatedVideo = {
        ...trending.find(v => v._id === videoId) || 
        Object.values(genres).flat().find(v => v._id === videoId) ||
        (featured?._id === videoId ? featured : null)
      };
      
      if (!updatedVideo) return;
      
      // Toggle the 'inMyList' status
      updatedVideo.inMyList = !updatedVideo.inMyList;
      
      // Make the API call
      await api.post(`/videos/${videoId}/mylist`, {
        action: updatedVideo.inMyList ? 'add' : 'remove'
      });
      
      // Update the UI state
      if (featured?._id === videoId) {
        setFeatured(updatedVideo);
      }
      
      // Update trending videos
      setTrending(prev => 
        prev.map(v => v._id === videoId ? updatedVideo : v)
      );
      
      // Update genre lists
      setGenres(prev => {
        const newGenres = { ...prev };
        Object.keys(newGenres).forEach(genre => {
          newGenres[genre] = newGenres[genre].map(v => 
            v._id === videoId ? updatedVideo : v
          );
        });
        return newGenres;
      });
      
      // Show feedback to user
      alert(updatedVideo.inMyList 
        ? 'Added to My List!' 
        : 'Removed from My List!'
      );
      
    } catch (error) {
      console.error('Error updating list:', error);
      alert('Failed to update your list. Please try again.');
    }
  };

  if (!featured) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <div 
        className="hero"
        style={{ backgroundImage: `url(${featured.thumbnail})` }}
      >
        <div className="hero-content">
          <h1>{featured.title}</h1>
          <p>{featured.description}</p>
          <div className="hero-buttons">
            <Link to={`/watch/${featured._id}`} className="btn-play">
              ▶ Play
            </Link>
            <button className="btn-info" onClick={() => handleAddToList(featured._id)}>
              ⓘ More Info
            </button>
          </div>
        </div>
        <div className="hero-fade"></div>
      </div>

      <div className="content">
        {recommendations.length > 0 && (
          <VideoRow 
            title="Recommended For You" 
            videos={recommendations} 
            onAddToList={handleAddToList}
          />
        )}
        
        <VideoRow 
          title="Trending Now" 
          videos={trending} 
          onAddToList={handleAddToList}
        />

        {Object.entries(genres).map(([genre, videos]) => (
          <VideoRow 
            key={genre}
            title={genre} 
            videos={videos} 
            onAddToList={handleAddToList}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
