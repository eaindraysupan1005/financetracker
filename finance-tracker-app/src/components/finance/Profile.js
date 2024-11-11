import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { userId } = useParams();
  const getUserApi = "http://localhost:8080/user";

  // Fetch profile data from backend
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get(getUserApi.concat("/") + userId)
      .then((response) => {
        console.log(response);
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    // Send updated profile to server
    fetch("http://localhost:8080/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      });
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      fetch("http://localhost:8080/profile", {
        method: "DELETE",
      })
        .then(() => {
          alert("Account deleted successfully.");
          setProfile({ name: "", email: "", password: "" });
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Failed to delete account.");
        });
    }
  };

  return (
    <div>
      <div className="container profile-container mt-5">
        <div className="card rounded profile-card">
          <div className="card-body text-center">
            <div className="profile-avatar mb-4">
              <i className="fa fa-user-circle fa-5x" aria-hidden="true"></i>
            </div>
            <div className="form-group row mb-4 me-3 profile-form">
              <label
                htmlFor="name"
                className="col-sm-3 col-form-label text-white text-end profile-label"
              >
                Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={profile.name}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group row mb-4 me-3 profile-form">
              <label
                htmlFor="email"
                className="col-sm-3 col-form-label text-white text-end profile-label"
              >
                Email
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={profile.email}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group row mb-4 me-3 profile-form profile-form">
              <label
                htmlFor="password"
                className="col-sm-3 col-form-label text-white text-end profile-label"
              >
                Password
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={profile.password}
                  readOnly
                />
              </div>
            </div>

            <button
              className="mt-3 border-rounded profile-btn"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="text-start mt-5">
          <h4 className="mb-3">Account Management</h4>
          <p>
            Logging out will end your current session. You will need to log in
            again to access your account, but your data will remain intact and
            unaffected.
          </p>
          <button className="btn profile-btn">Log Out</button>
          <p className="mt-3">
            Deleting your account means removing all of your data from your
            account permanently and you cannot log in it again at any time.
          </p>
          <button
            className="btn btn-danger mt-3 ml-3 mb-5 delete-btn"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modal for Editing Profile */}
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content edit-profile-popup">
            <h5
              className="modal-title fw-bold m-auto mt-3 edit-profile-title"
              id="editProfileModalLabel"
            >
              Edit Profile
            </h5>

            <div className="modal-body">
              <form>
                <div className="form-group row mb-3 profile-form">
                  <label className=" col-2 text-start">Name</label>
                  <div className="col-10">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={profile.username}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3 profile-form">
                  <label className="col-2 text-start">Email</label>
                  <div className="col-10">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={profile.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3 profile-form">
                  <label className="col-2 text-start">Password</label>
                  <div className="col-10">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={profile.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="mb-5 Edit-form-btn">
              <button
                type="button"
                className="btn me-3 cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn save-btn"
                onClick={handleSaveChanges}
              >
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
