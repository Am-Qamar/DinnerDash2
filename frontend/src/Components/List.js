import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);

  // State variables for editable fields
  const [editableTitle, setEditableTitle] = useState("");
  const [editableDescription, setEditableDescription] = useState("");
  const [editablePrice, setEditablePrice] = useState(0);
  const [editableQuantity, setEditableQuantity] = useState(0);
  const [editablePhoto, setEditablePhoto] = useState("");
  const [editableCategories, setEditableCategories] = useState([]);
  const [editableRestaurantIDs, setEditableRestaurantIDs] = useState([]);
  const [editableStatus, setEditableStatus] = useState("");

  useEffect(() => {
    axios.get("/items").then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleEditClick = (item) => {
    // Enable editing for a specific item
    setEditableItemId(item._id);

    // Populate the editable fields with item data
    setEditableTitle(item.title);
    setEditableDescription(item.description);
    setEditablePrice(item.price);
    setEditableQuantity(item.quantity);
    setEditablePhoto(item.photo || "");
    setEditableCategories([...item.categories]);
    setEditableRestaurantIDs([...item.restaurantIDs]);
    setEditableStatus(item.status);
  };

  const handleSaveClick = (item) => {
    // Save the updated item data to the server
    const updatedItem = {
      ...item,
      title: editableTitle,
      description: editableDescription,
      price: editablePrice,
      quantity: editableQuantity,
      photo: editablePhoto,
      categories: editableCategories,
      restaurantIDs: editableRestaurantIDs,
      status: editableStatus,
    };

    axios.patch(`/items/${item._id}`, updatedItem).then(() => {
      // Disable editing for this item
      setEditableItemId(null);

      // Fetch all items again to reflect the changes
      axios.get("/items").then((response) => {
        setItems(response.data);
      });
    });
  };

  const handleDeleteClick = (itemId) => {
    // Delete the item from the server
    axios.delete(`/items/${itemId}`).then(() => {
      // Fetch all items again to reflect the changes
      axios.get("/items").then((response) => {
        setItems(response.data);
      });
    });
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editableItemId === item._id ? (
              <div>
                <input
                  type="text"
                  value={editableTitle}
                  onChange={(e) => setEditableTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editableDescription}
                  onChange={(e) => setEditableDescription(e.target.value)}
                />
                <input
                  type="number"
                  value={editablePrice}
                  onChange={(e) => setEditablePrice(Number(e.target.value))}
                />
                <input
                  type="number"
                  value={editableQuantity}
                  onChange={(e) => setEditableQuantity(Number(e.target.value))}
                />
                <input
                  type="text"
                  value={editablePhoto}
                  onChange={(e) => setEditablePhoto(e.target.value)}
                />
                {/* Add input fields for other editable attributes */}
                <button onClick={() => handleSaveClick(item)}>Save</button>
              </div>
            ) : (
              <>
                <p>Title: {item.title}</p>
                <p>Description: {item.description}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Photo: {item.photo}</p>
                {/* Display other attributes here */}
                <button onClick={() => handleEditClick(item)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDeleteClick(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
