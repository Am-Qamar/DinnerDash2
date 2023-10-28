import React, { useState } from "react";
import axios from "axios";

function LoginUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        // You can perform further actions here, e.g., redirect the user
      } else {
        setLoginError("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An error occurred during login.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src="images/signin-image.jpg" alt="sign up image" />
            </figure>
            <a href="#" className="signup-image-link">
              Create an account
            </a>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign up</h2>
            <form
              onSubmit={handleSubmit}
              className="register-form"
              id="login-form"
            >
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email} // Connect value to state
                  onChange={handleChange} // Connect onChange to state
                />
              </div>
              <div className="form-group">
                <label htmlFor="your_pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="your_pass"
                  placeholder="Password"
                  value={formData.password} // Connect value to state
                  onChange={handleChange} // Connect onChange to state
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="agree-term"
                />
                <label htmlFor="remember-me" className="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  Remember me
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Log in"
                />
              </div>
            </form>
            <div className="social-login">
              <span className="social-label">Or login with</span>
              <ul className="socials">
                <li>
                  <a href="#">
                    <i className="display-flex-center zmdi zmdi-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="display-flex-center zmdi zmdi-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="display-flex-center zmdi zmdi-google"></i>
                  </a>
                </li>
              </ul>
            </div>
            {loginError && <p className="error-message">{loginError}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginUser;
