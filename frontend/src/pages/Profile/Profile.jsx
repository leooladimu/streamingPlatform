import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.put('/auth/profile', { name, email });
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Account</h1>
        
        <div className="profile-section">
          <div className="profile-avatar">
            <img src={user?.avatar} alt="Profile" />
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              {message && <div className="message">{message}</div>}
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span className="label">Name:</span>
                <span>{user?.name}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Subscription:</span>
                <span className="subscription">{user?.subscription}</span>
              </div>
              <button className="edit-btn" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button className="logout-btn" onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
