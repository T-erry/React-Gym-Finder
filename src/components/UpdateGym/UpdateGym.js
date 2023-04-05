import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBarTwo from "../NavBar/NavBarTwo";
import "./UpdateGym.css";

function UpdateGym() {
  const token = localStorage.getItem("jwt");
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [operating_hours, setOperatingHours] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch(`https://gymfinder.onrender.com/gyms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => r.json())
    .then((data) => {
      const { image, name, location, operating_hours, price } = data;
      setName(image);
      setName(name);
      setLocation(location);
      setOperatingHours(operating_hours);
      setPrice(price);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [id, token]);
console.log(image);
  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/gyms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image,
        name,
        location,
        operating_hours,
        price
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setImage(data.image);
        setName(data.title);
        setLocation(data.author);
        setOperatingHours(data.operatingHours);
        setPrice(data.price);
        navigate(`/view/${id}`);
        document.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <NavBarTwo />
      <div id="form">
        <form id="formCard" className="card" onSubmit={handleSubmit}>
          <h3>Update Gym</h3>
          <div className="form-label mb-3">
            <label>Gym Image</label>
            <input
            className="input"
            type="file"
            accept="image/png, image/jpeg"
            name="image"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  setImage(reader.result);
                };
              }
            }}
          />
  

          </div>

          
          <div className="mb-3">
            <label className="form-label">Gym Name</label>
            <input
              className="form-control"
              name="name"
              value={name}
              placeholder="Type Here"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gym Location</label>
            <input
              className="form-control"
              name="location"
              value={location}
              placeholder="Type Here"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gym Operating Hours</label>
            <input
              className="form-control"
              name="operatingHours"
              value={operating_hours}
              placeholder="Type Here"
              onChange={(e) => setOperatingHours(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gym Price</label>
            <input
              className="form-control"
              type="number"
              name="price"
              value={price}
              placeholder="Type Here"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-outline-dark btn-sm m-4">
            Update Gym
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateGym;