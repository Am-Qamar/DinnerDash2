import React, { useState } from "react";
import axios from "axios";

const CreateItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    photo: "",
    categories: ["5f43a9e3d2ef"],
    restaurantIDs: [],
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/items", formData).then(() => {
      setFormData({
        title: "",
        description: "",
        price: "",
        quantity: "",
        photo: "",
        categories: ["5f43a9e3d2ef"],
        restaurantIDs: [],
        status: "",
        // Reset other fields
      });
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        <input
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleInputChange}
          placeholder="Photo"
        />
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          placeholder="Status"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateItem;
