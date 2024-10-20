import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // State to manage profile information
  const [profile, setProfile] = useState({
    username: 'Irene',
    email: 'eaindraysu@gmail.com',
    password: '********',
  });

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleEditProfile = () => {
    if (isEditing) {
      // Send updated profile to server
      fetch('https://your-api-url.com/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Profile updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile.');
        });
    }
    setIsEditing(!isEditing);
  };
  
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      // Send request to delete account
      fetch('https://your-api-url.com/profile', {
        method: 'DELETE',
      })
        .then(() => {
          alert('Account deleted successfully.');
          setProfile({ username: '', email: '', password: '' }); // Clear profile
        })
        .catch((error) => {
          console.error('Error deleting account:', error);
          alert('Failed to delete account.');
        });
    }
  };
  

  return (
    <div className="container profile-container mt-5">
      <div className="card">
        <div className="card-body text-center">
          <div className="profile-avatar mb-4">
            <i className="fa fa-user-circle fa-5x" aria-hidden="true"></i>
          </div>
          <div className="form-group">
            <label>UserName</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={profile.username}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={profile.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={profile.password}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <button
            className={`btn ${isEditing ? 'btn-success' : 'btn-warning'} mt-3`}
            onClick={handleEditProfile}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>

          <button className="btn btn-danger mt-3 ml-3" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-secondary">Log Out</button>
      </div>
    </div>
  );
};

export default Profile;