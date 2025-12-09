import { useState } from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

const VideoCard = ({ video, onAddToList }) => {
  const [hovered, setHovered] = useState(false);
  const [isInList, setIsInList] = useState(video.inMyList || false);
  
  const handleAddToList = (e) => {
    e.preventDefault();
    setIsInList(!isInList);
    onAddToList(video._id);
  };

  return (
    <div 
      className="video-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/watch/${video._id}`}>
        <img src={video.thumbnail} alt={video.title} className="thumbnail" />
      </Link>
      
      {hovered && (
        <div className="video-info">
          <h3>{video.title}</h3>
          <div className="video-meta">
            <span className="rating">{video.rating}</span>
            <span>{video.releaseYear}</span>
            <span>{Math.floor(video.duration / 60)} min</span>
          </div>
          <div className="genres">
            {video.genre?.slice(0, 3).map((g, i) => (
              <span key={i}>{g}</span>
            ))}
          </div>
          <div className="actions">
            <Link to={`/watch/${video._id}`} className="play-btn">
              ▶ Play
            </Link>
            <button 
              className={`add-btn ${isInList ? 'in-list' : ''}`} 
              onClick={handleAddToList}
            >
              {isInList ? '✓ In My List' : '+ My List'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
