import { useState } from "react";
import TruckTable from "./TruckTable"; // Your existing table
import 'bootstrap/dist/css/bootstrap.min.css';

function TruckDashboard({ trucks, onAddTruck, onComplete, onMoveToLoading }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    registration: "",
    arrival_date: "",
    job_card_date: "",
    spares: "",
    supplier: "",
    amount: "",
    deadline: "",
  });

  const processingTrucks = trucks
  .filter((t) => !t.completed)
  .map((truck) => {
    const today = new Date();
    const deadline = new Date(truck.deadline);
    const isOverdue = deadline < today.setHours(0, 0, 0, 0);
    return { ...truck, isOverdue };
  });
  console.log(processingTrucks)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTruck(formData);
    setFormData({
      registration: "",
      arrival_date: "",
      job_card_date: "",
      spares: "",
      supplier: "",
      amount: "",
      deadline: "",
    });
    setShowForm(false);
  };

  return (
    <div className="container py-3 position-relative">
      {/* Floating "+" Button */}
      <button
        className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg fs-4 fw-bold"
        style={{ width: "50px", height: "50px", zIndex: 1050 }}
        onClick={() => setShowForm(!showForm)}
        title="Add Truck"
      >
        +
      </button>

      {/* Form toggled by the button */}
      {showForm && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Add Truck</h6>
            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="registration"
                    value={formData.registration}
                    onChange={handleChange}
                    placeholder="Truck Registration"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="arrival_date"
                    value={formData.arrival_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="job_card_date"
                    value={formData.job_card_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="spares"
                    value={formData.spares}
                    onChange={handleChange}
                    placeholder="Spares"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    placeholder="Supplier"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    placeholder="Deadline"
                  />
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-success" type="submit">
                  Add Truck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Truck Table Component */}
      <TruckTable
        trucks={trucks}
        onComplete={onComplete}
        onMoveToLoading={onMoveToLoading}
        title="STK STU W/S Dashboard"
      />
    </div>
  );
}

export default TruckDashboard;
