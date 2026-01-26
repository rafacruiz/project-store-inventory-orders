import { Link, useParams } from "react-router-dom";
import './warehouse-select-item.css';

function WarehouseSelectItem({ warehouses, variant }) {
  const { id } = useParams();

  return (
    <>
      {warehouses.map((warehouse) => {
        const isActive = id === String(warehouse.id);

        if (variant === "list") {
            return (
                <Link
                    key={warehouse.id}
                    to={`/warehouse/${warehouse.id}`}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center 
                        ${isActive ? 'active' : '' }`} >
                    <span>🏬 { warehouse.name }</span>
                    <span className="small">#{ warehouse.id }</span>
                </Link>
            );
        } else {
            return (
                <div key={warehouse.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <Link 
                        to={`/warehouse/${warehouse.id}`} 
                        className={`card h-100 text-decoration-none warehouse-card ${isActive ? 'warehouse-card-active' : '' }`} >
                    <div className="warehouse-card-body">
                        <span className="badge bg-primary mb-2">Warehouse</span>
                        <h5 className="warehouse-title">🏬 { warehouse.name }</h5>
                        <p className="warehouse-subtitle"> ID: { warehouse.id }</p>
                    </div>
                    </Link>
                </div>
            );
        }
      })}
    </>
  );
}

export default WarehouseSelectItem;
