import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBarTwo from "../NavBar/NavBarTwo";
import "./ViewGym.css";
import Swal from "sweetalert2";

function ViewGym() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gym, setGym] = useState([]);
  const token = localStorage.getItem("jwt");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/gyms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Not Your Gym");
        }
      })
      .then((data) => setGym(data))
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not Your Gym!",
        });
        navigate("/dashboard");
      });
  }, [id, token, navigate]);

  function handleDeleteClick() {
    fetch(`https://gymfinder.onrender.com/gyms/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // ongymDelete(id);
    navigate("/dashboard");
    document.location.reload();
  }

  return (
    <>
      <NavBarTwo/>
      <div id="outerCard" className="card p-5">
        <div id="innerCard" className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row">
            <div className="col-md-5">
              <img
                id="gymImg"
                src={gym.image}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div id="cardDetail" className="col-md-7">
              <div className="card-body">
                <h4 className="card-title">Name: {gym.name}</h4>
                <p className="card-text">Location: {gym.location}</p>
                <p className="card-text">
                  operating Hours: {gym.operating_hours}
                </p>
                <p className="card-text">Price: ${gym.price}</p>

                <div id="linkBtn">
                  <Link
                    to={`https://gymfinder.onrender.com/updategym/${gym.id}`}
                    className="btn btn-outline-dark btn-md"
                  >
                    Update
                  </Link>
                  <button
                    onClick={handleDeleteClick}
                    className="btn btn-outline-dark btn-md m-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewGym;