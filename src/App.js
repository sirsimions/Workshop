// App.js
/*import React, { useEffect, useState } from "react";
import TruckDashboard from "./Components/TruckDashboard";

function App() {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = () => {
    fetch("http://localhost:3000/truckshow")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trucks");
        return res.json();
      })
      .then((data) => setTrucks(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleComplete = (id) => {
    fetch(`http://localhost:3000/truckcomplete/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to mark complete");
        return res.json();
      })
      .then(() => fetchTrucks())
      .catch((err) => console.error("Complete error:", err));
  };

  const handleAdd = (truck) => {
    fetch("http://localhost:3000/truckcreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(truck),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add truck");
        return res.json();
      })
      .then(() => fetchTrucks())
      .catch((err) => console.error("Add error:", err));
  };

  const handleMoveToLoading = (truck) => {
    fetch("http://localhost:3000/loadings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loading: truck }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to move to loading");
        return res.json();
      })
      .then(() => {
        return fetch(`http://localhost:3000/truckdelete/${truck.id}`, {
          method: "DELETE",
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete original truck");
        return res.json();
      })
      .then(() => {
        alert(`Truck ${truck.registration} moved to Loading and removed.`);
        fetchTrucks();
      })
      .catch((err) => console.error("Move to Loading error:", err));
  };

  return (
    <TruckDashboard
      trucks={trucks}
      onAddTruck={handleAdd}
      onComplete={handleComplete}
      onMoveToLoading={handleMoveToLoading}
    />
  );
}

export default App;*/

import { useState, useEffect } from "react";
import TruckDashboard from "./Components/TruckDashboard";
import LandingDashboard from "./Components/LandingDashboard";


function App() {
  const [trucks, setTrucks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // Load login state from sessionStorage
  useEffect(() => {
    const sessionStatus = sessionStorage.getItem("workshopLoggedIn");
    if (sessionStatus === "true") {
      setLoggedIn(true);
    }
    fetchTrucks();
  }, []);

  const fetchTrucks = () => {
    fetch("https://workshopback-rk2x.onrender.com/truckshow")
      .then((res) => res.json())
      .then((data) => setTrucks(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleLogin = () => {
    sessionStorage.setItem("workshopLoggedIn", "true");
    setLoggedIn(true);
  };
  console.log(handleLogin)

  const handleLogout = () => {
    sessionStorage.removeItem("workshopLoggedIn");
    setLoggedIn(false);
  };
  console.log(handleLogout)

  const handleAdd = (truck) => {
    fetch("https://workshopback-rk2x.onrender.com/truckcreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("workshopToken")}`,
      },
      body: JSON.stringify(truck),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add truck");
        return res.json();
      })
      .then(() => fetchTrucks())
      .catch((err) => console.error("Add error:", err));
  };


  const handleComplete = (id) => {
    if (!loggedIn) return;
    fetch(`https://workshopback-rk2x.onrender.com/truckcomplete/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("workshopToken")}`,
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to complete truck");
        return res.json();
      })
      .then(() => fetchTrucks())
      .catch((err) => console.error("Complete error:", err));
  };

  const handleMoveToLoading = (truck) => {
    if (!loggedIn) return;
    fetch("https://workshopback-rk2x.onrender.com/loadings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("workshopToken")}`,
      },
      body: JSON.stringify({ loading: truck }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to move to loading");
        return res.json();
      })
      .then(() =>
        fetch(`https://workshopback-rk2x.onrender.com/truckdelete/${truck.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("workshopToken")}`,
          },
        })
      )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete original truck");
        return res.json();
      })
      .then(() => {
        alert(`Truck ${truck.registration} moved to Loading and removed.`);
        fetchTrucks();
      })
      .catch((err) => console.error("Move to Loading error:", err));
  };


  return (
    <div className="container p-4">
      {!loggedIn ? (
        <>
          <LandingDashboard trucks={trucks} setLoggedIn={setLoggedIn} />
        </>
      ) : (
        <>
          <TruckDashboard
            trucks={trucks}
            onAddTruck={handleAdd}
            onComplete={handleComplete}
            onMoveToLoading={handleMoveToLoading}
          />
          <button
            onClick={() => {
              sessionStorage.clear();
              setLoggedIn(false);
            }}
            className="btn btn-secondary mt-4"
          >
            Logout
          </button>
        </>
      )}

    </div>
  );
}

export default App;
