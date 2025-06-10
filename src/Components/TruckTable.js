import 'bootstrap/dist/css/bootstrap.min.css';

function TruckTable({ trucks, onComplete, onMoveToLoading, title }) {
  if (trucks.length === 0) return <p></p>;

  return (
    <div className="container px-2">
      <style>{`
        .completed-flash {
          background-color: #d4edda;
          animation: pulse-flash 2s ease-in-out infinite;
        }

        @keyframes pulse-flash {
          0%, 100% {
            background-color: #d4edda;
            box-shadow: 0 0 5px #a3dca3;
          }
          50% {
            background-color: #a8f0a1;
            box-shadow: 0 0 20px #7ad67a;
          }
        }

        button.complete-btn {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
        }
        button.complete-btn:hover {
          background-color: #218838;
        }

        button.loading-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          margin-left: 5px;
        }
        button.loading-btn:hover {
          background-color: #0056b3;
        }

        .truck-card {
          font-size: 0.9rem;
        }

        @media (min-width: 768px) {
          .truck-table {
            display: table;
          }
          .truck-card-view {
            display: none;
          }
        }

        @media (max-width: 767px) {
          .truck-table {
            display: none;
          }
          .truck-card-view {
            display: block;
          }
        }
      `}</style>

      {title && <h5 className="text-center fw-bold my-3">{title}</h5>}

      {/* Table for medium and larger devices */}
      <div className="truck-table">
        <table className="table table-bordered table-hover text-sm">
          <thead className="table-light">
            <tr>
              <th>Truck Reg</th>
              <th>Arrival Date</th>
              <th>Job Card Date</th>
              <th>Spares</th>
              <th>Supplier</th>
              <th>Amount (Ksh)</th>
              <th>Deadline</th>
              {(onComplete || onMoveToLoading) && <th>W/S Status</th>}
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck, idx) => (
              <tr
                key={truck.id}
                className={`${
                  truck.completed ? "completed-flash" : ""
                } ${idx % 2 === 0 ? "table-light" : "table-white"}`}
              >
                <td>{truck.registration}</td>
                <td>{truck.arrival_date}</td>
                <td>{truck.job_card_date}</td>
                <td>{truck.spares}</td>
                <td>{truck.supplier}</td>
                <td>{truck.amount.toLocaleString()}</td>
                <td>{truck.deadline}</td>
                {(onComplete || onMoveToLoading) && (
                  <td>
                    {!truck.completed && onComplete && (
                      <button
                        className="complete-btn"
                        onClick={() => onComplete(truck.id)}
                      >
                        Maintenance in Progress
                      </button>
                    )}
                    {truck.completed && onMoveToLoading && (
                      <button
                        className="loading-btn"
                        onClick={() => onMoveToLoading(truck)}
                      >
                        Ready
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="truck-card-view">
        {trucks.map((truck, idx) => (
          <div
            key={truck.id}
            className={`card mb-3 truck-card shadow-sm ${
              idx % 2 === 0 ? "bg-light" : "bg-white"
            } ${truck.completed ? "completed-flash" : ""}`}
          >
            <div className="card-body py-2">
              <h6 className="card-title mb-2 fw-bold text-primary">
                {truck.registration}
              </h6>
              <p className="mb-1">Arrival: {truck.arrival_date}</p>
              <p className="mb-1">Job Card: {truck.job_card_date}</p>
              <p className="mb-1">Spares: {truck.spares}</p>
              <p className="mb-1">Supplier: {truck.supplier}</p>
              <p className="mb-1">Amount: Ksh {truck.amount.toLocaleString()}</p>
              <p className="mb-2">Deadline: {truck.deadline}</p>
              {(onComplete || onMoveToLoading) && (
                <div>
                  {!truck.completed && onComplete && (
                    <button
                      className="complete-btn"
                      onClick={() => onComplete(truck.id)}
                    >
                      Under Maintenance
                    </button>
                  )}
                  {truck.completed && onMoveToLoading && (
                    <button
                      className="loading-btn"
                      onClick={() => onMoveToLoading(truck)}
                    >
                      Ready
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TruckTable;
