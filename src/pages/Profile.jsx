import React, { useState } from "react";
import defaultProfile from "../assets/defaultprofile.png";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");

  const [profile, setProfile] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="container-fluid bg-white min-vh-100 px-0">
      {/* Page heading */}
      <div
        className="text-white px-4 py-3 mb-4"
        style={{
          background:
            "linear-gradient(180deg, #F21299 0%, #1B02B5 100%)",
          maxWidth: "575px",
        }}
      >
        <h1 className="h2 mb-0">Profile</h1>
      </div>

      <div className="container pb-5">
        {/* Profile information */}
        <form onSubmit={handleUpdate}>
          <div className="row g-4 align-items-start">
            {/* Profile picture */}
            <div className="col-12 col-lg-3 text-center">
              <img
                src={defaultProfile}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{
                  width: "225px",
                  height: "225px",
                  objectFit: "cover",
                }}
              />

              <div className="fw-semibold fs-5">My Account</div>
            </div>

            {/* Account fields */}
            <div className="col-12 col-lg-9">
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter a new password"
                    value={profile.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                <label className="form-label">Gender</label>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={profile.gender === "Male"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      checked={profile.gender === "Female"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
                <div className="col-12 text-end">
                  <button
                    type="submit"
                    className="btn text-white px-4 py-2 rounded-pill"
                    style={{ backgroundColor: "#6200EE" }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <hr className="my-5" />

        {/* Order history and favourites */}
        <ul className="nav nav-tabs gap-3 mb-4">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${
                activeTab === "orders" ? "active" : "text-dark"
              }`}
              onClick={() => setActiveTab("orders")}
              style={
                activeTab === "orders"
                  ? { color: "#DD2AED", borderBottomColor: "#DD2AED" }
                  : {}
              }
            >
              Order History
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${
                activeTab === "favorites" ? "active" : "text-dark"
              }`}
              onClick={() => setActiveTab("favorites")}
              style={
                activeTab === "favorites"
                  ? { color: "#DD2AED", borderBottomColor: "#DD2AED" }
                  : {}
              }
            >
              Favourite
            </button>
          </li>
        </ul>

        {activeTab === "orders" && (
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center">
              <thead className="table-secondary">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="text-muted py-4">
                    No orders to display.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="text-center text-muted py-5">
            Your favourite products will appear here.
          </div>
        )}
      </div>
    </div>
  );
}