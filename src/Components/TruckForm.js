import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function TruckForm({ onAdd }) {
  const [form, setForm] = useState({
    registration: "",
    arrival_date: "",
    job_card_date: "",
    spares: "",
    supplier: "",
    amount: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      registration: "",
      arrival_date: "",
      job_card_date: "",
      spares: "",
      supplier: "",
      amount: "",
      deadline: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
      <h4 className="mb-4">🚚 Add Truck Maintenance Record</h4>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Truck Registration</label>
          <input
            type="text"
            name="registration"
            className="form-control"
            placeholder="e.g., KCH 123A"
            required
            value={form.registration}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Arrival Date</label>
          <input
            type="date"
            name="arrival_date"
            className="form-control"
            required
            value={form.arrival_date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Job Card Date</label>
          <input
            type="date"
            name="job_card_date"
            className="form-control"
            required
            value={form.job_card_date}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Spares Required</label>
          <input
            type="text"
            name="spares"
            className="form-control"
            placeholder="e.g., Brake pads"
            value={form.spares}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Supplier</label>
          <input
            type="text"
            name="supplier"
            className="form-control"
            placeholder="e.g., AutoZone"
            value={form.supplier}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Amount (Ksh)</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            placeholder="e.g., 45000"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Deadline</label>
          <input
            type="date"
            name="deadline"
            className="form-control"
            required
            value={form.deadline}
            onChange={handleChange}
          />
        </div>
        
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary">
          ➕ Add Truck
        </button>
      </div>
    </form>
  );
}

export default TruckForm;
