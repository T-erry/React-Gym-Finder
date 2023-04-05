import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateGym.css";

function CreateGym({ onAddGym }) {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    location: "",
    operating_hours: "",
    price: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const { image, name, location, operating_hours, price} = formData;
    if (!image || !name || !location || !operating_hours || !price) {
      alert("Please fill out all fields.");
      return;
    }

    fetch("/gyms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        onAddGym(data);
      })
      .catch((error) => {
        setError(error.message);
      });
    navigate("/dashboard");
    document.location.reload();
  }

  function handleChange(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (e.target.type === 'file') {
      value = URL.createObjectURL(e.target.files[0]); // create URL for uploaded image
    }
    setFormData({ ...formData, [key]: value });
  }


  return (
    <>
      <div id="form">
        <form id="formCard" className="card" onSubmit={handleSubmit}>
          <h3>Create Gym</h3>
          {/* <p>this is {token}.</p> */}
          <div className="mb-3">
            <label className="form-label">Gym Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="form-control"
              name="image"
            />
            {formData.image && (
              <img src={formData.image} alt="Gym" className="gym-image" />
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Gym Name</label>
            <input
              onChange={handleChange}
              className="form-control"
              name="name"
              placeholder="Type Here"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gym Location</label>
            <input
              onChange={handleChange}
              className="form-control"
              name="location"
              placeholder="Type Here"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gym Operating Hours</label>
            <input
              onChange={handleChange}
              className="form-control"
              name="operating_hours"
              placeholder="Type Here"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gym Price</label>
            <input
              type="number"
              onChange={handleChange}
              className="form-control"
              name="price"
              placeholder="Type Here"
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-dark btn-sm m-4"
          >
            Create Gym
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateGym;