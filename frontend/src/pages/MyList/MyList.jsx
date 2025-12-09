import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import api from '../../utils/api';
import VideoRow from '../../components/VideoRow/VideoRow';
import './MyList.css';

const MyList = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refetch whenever the user navigates to this page
  useEffect(() => {
    fetchMyList();
  }, [user, location]); // location will trigger refetch on navigation

  const fetchMyList = async () => {
    try {
      setLoading(true);
      console.log('Fetching user data...');
      
      // Get the user's data with populated myList
      const { data: userData } = await api.get('/auth/me');
      console.log('User data:', userData);
      console.log('MyList from user:', userData.myList);
      
      // The backend already populates myList with full video objects
      if (userData.myList && userData.myList.length > 0) {
        setMyList(userData.myList);
        console.log('Set myList with', userData.myList.length, 'videos');
      } else {
        console.log('No videos in myList');
        setMyList([]);
      }
    } catch (error) {
      console.error('Error fetching my list:', error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromList = async (videoId) => {
    try {
      // Optimistically update the UI
      setMyList(prevList => prevList.filter(v => v._id !== videoId));
      
      // Make the API call to update the backend
      await api.post(`/videos/${videoId}/mylist`, {
        action: 'remove'
      });
      
      // Refresh the list to ensure it's in sync with the backend
      await fetchMyList();
    } catch (error) {
      console.error('Error removing from list:', error);
      // If there's an error, refetch the list to restore the correct state
      fetchMyList();
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="my-list">
      <h1>My List</h1>
      {loading ? (
        <div className="loading">Loading your list...</div>
      ) : myList.length > 0 ? (
        <>
          <VideoRow 
            videos={myList} 
            onRemoveFromList={handleRemoveFromList}
            showRemoveButton={true}
          />
        </>
      ) : (
        <div className="empty-list">
          <h2>Your list is empty</h2>
          <p>Add movies and shows to your list to watch them later</p>
        </div>
      )}
    </div>
  );
};

export default MyList;
