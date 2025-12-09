import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import VideoRow from '../../components/VideoRow/VideoRow';
import './Watch.css';

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const [videoRes, similarRes] = await Promise.all([
        api.get(`/videos/${id}`),
        api.get(`/recommendations/similar/${id}`)
      ]);

      setVideo(videoRes.data);
      setSimilar(similarRes.data);
    } catch (error) {
      console.error('Error fetching video:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleProgress = async (progress) => {
    try {
      await api.post(`/videos/${id}/watch`, {
        progress,
        completed: progress >= 90
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleEnded = async () => {
    try {
      await api.post(`/videos/${id}/watch`, {
        progress: 100,
        completed: true
      });
    } catch (error) {
      console.error('Error marking as completed:', error);
    }
  };

  const handleAddToList = async (videoId) => {
    try {
      await api.post(`/videos/${videoId}/mylist`);
      alert('Added to My List!');
    } catch (error) {
      console.error('Error adding to list:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!video) {
    return <div className="loading">Video not found</div>;
  }

  return (
    <div className="watch-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <VideoPlayer 
        video={video} 
        onProgress={handleProgress}
        onEnded={handleEnded}
      />

      <div className="watch-content">
        <div className="video-details">
          <h1>{video.title}</h1>
          <div className="video-meta">
            <span className="rating">{video.rating}</span>
            <span>{video.releaseYear}</span>
            <span>{Math.floor(video.duration / 60)} min</span>
          </div>
          <p className="description">{video.description}</p>
          <div className="video-genres">
            <strong>Genres:</strong> {video.genre?.join(', ')}
          </div>
          {video.cast && video.cast.length > 0 && (
            <div className="video-cast">
              <strong>Cast:</strong> {video.cast.join(', ')}
            </div>
          )}
          {video.director && (
            <div className="video-director">
              <strong>Director:</strong> {video.director}
            </div>
          )}
        </div>

        {similar.length > 0 && (
          <VideoRow 
            title="More Like This" 
            videos={similar}
            onAddToList={handleAddToList}
          />
        )}
      </div>
    </div>
  );
};

export default Watch;
