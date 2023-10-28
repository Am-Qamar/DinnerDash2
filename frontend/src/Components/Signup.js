import React, { useState } from "react";
import axios from "axios";

function Signup() {
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // Changed 'pass' to 'password'
    re_pass: "",
    dispName: "", // Added 'dispName'
    agreeTerm: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("it is working");

    // Password validation: Check if password and re_pass match
    if (formData.password !== formData.re_pass) {
      alert("Passwords do not match!");
      return;
    }

    // Email validation: A simple regex pattern to check for a valid email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Invalid email format!");
      return;
    }

    // If both password and email are valid, send a POST request using Axios
    try {
      const response = await axios.post("/user", {
        name: formData.name,
        email: formData.email,
        dispName: formData.dispName,
        password: formData.password,
      });

      if (response.status === 200) {
        // The user has been successfully created
        console.log("User created successfully!");
        // You can perform further actions here, e.g., redirect the user or display a success message.
      } else {
        // Handle errors, e.g., display an error message to the user
        console.error("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form
              onSubmit={handleSubmit}
              className="register-form"
              id="register-form"
            >
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dispName">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="text"
                  name="dispName"
                  id="dispName"
                  placeholder="Your Display Name"
                  value={formData.dispName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="re_pass">
                  <i className="zmdi zmdi-lock-outline"></i>
                </label>
                <input
                  type="password"
                  name="re_pass"
                  id="re_pass"
                  placeholder="Repeat your password"
                  value={formData.re_pass}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="agreeTerm"
                  id="agree-term"
                  className="agree-term"
                  checked={formData.agreeTerm}
                  onChange={handleInputChange}
                />
                <label htmlFor="agree-term" className="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  I agree all statements in{" "}
                  <a href="#" className="term-service">
                    Terms of service
                  </a>
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Register"
                />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img src="images/signup-image.jpg" alt="sign up image" />
            </figure>
            <a href="#" className="signup-image-link">
              I am already a member
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
