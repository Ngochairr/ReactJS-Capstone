import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  clearAuthError,
  facebookLogin,
  signIn,
} from "../redux/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || "/profile", {
        replace: true,
      });
    }
  }, [user, navigate, location.state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signIn({ email, password }));
  };

  const handleFacebook = () => {
    // This endpoint usually requires a Facebook access token from the Facebook Login SDK.
    const accessToken = window.prompt(
      "Enter the Facebook access token provided by the Facebook Login SDK:"
    );

    if (accessToken) {
      dispatch(facebookLogin({ accessToken }));
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2 className="section-title">Login</h2>

        <p className="text-muted small">
          Sign in to your account
        </p>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {String(error)}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>

            <input
              id="email"
              className="form-control"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="password">
              Password
            </label>

            <input
              id="password"
              className="form-control"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-end mb-3">
            <Link to="/register" className="small">
              Register
            </Link>
          </div>

          <button
            className="btn btn-primary w-100 login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <button
            className="btn btn-facebook w-100 mt-3"
            type="button"
            onClick={handleFacebook}
            disabled={loading}
          >
            <i className="bi bi-facebook me-2" />
            Continue with Facebook
          </button>
        </form>
      </div>
    </section>
  );
}