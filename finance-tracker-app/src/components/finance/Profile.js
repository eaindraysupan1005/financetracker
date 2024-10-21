import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // State to manage profile information
  const [profile, setProfile] = useState({
    username: 'Irene',
    email: 'eaindraysu@gmail.com',
    password: '12345678',
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
    <div>
      <div className="container profile-container mt-5">
      <div className="card rounded profile-card">
        <div className="card-body text-center ">
          <div className="profile-avatar mb-4">
            <i className="fa fa-user-circle fa-5x" aria-hidden="true"></i>
          </div>
          <form>
          <div className="form-group row mb-4 me-3">
            <label className="col-sm-3 col-form-label text-white text-end profile-label">Name</label>
            <div className="col-sm-9">
            <input
      type="text"
      name="username"
      className="form-control"
      value={profile.username}
      onChange={handleInputChange}
      readOnly={!isEditing}
    />
  </div>
</div>

<div className="form-group row mb-4 me-3">
  <label className="col-sm-3 col-form-label text-white text-end profile-label">Email</label>
  <div className="col-sm-9">
    <input
      type="email"
      name="email"
      className="form-control"
      value={profile.email}
      onChange={handleInputChange}
      readOnly={!isEditing}
    />
  </div>
</div>

<div className="form-group row mb-4 me-3">
  <label className="col-sm-3 col-form-label text-white text-end profile-label">Password</label>
  <div className="col-sm-9">
    <input
      type="password"
      name="password"
      className="form-control"
      value={profile.password}
      onChange={handleInputChange}
      readOnly={!isEditing}
    />
  </div>
</div>
          </form>
          <button
            className='mt-3 profile-btn'
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>  
        </div>
      </div>
      
      <div className="text-start mt-5">
      <h4 className='mb-3'>Account Management</h4>
        <p>
        Logging out will end your current session. You will need to log in again to access your account, but your data will remain intact and unaffected.
        </p>
        <button className="btn profile-btn">Log Out</button>
        <p className='mt-3'>
        Deleting your account means removing all of your data from your account permanently and you cannot log in it again at any time.
      </p>
      <button className="btn btn-danger mt-3 ml-3 mb-5 delete-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
      </div>
    </div>
    </div>
  );
};

export default Profile;