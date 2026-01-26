import { useEffect, useState } from "react";
import * as ShopManager from "../../../../services/shopManager-service";
import WarehouseSelectItem from "../warehouse-select-item/warehouse-select-item";

const VIEW = {
  LIST: "list",
  GRID: "grid",
};

function WarehouseSelect() {
    const [warehouses, setWarehouses] = useState([]);
    const [view, setView] = useState(VIEW.GRID);

    useEffect(() => {
        const fetchWarehouse = async () => {
        try {
            const warehouses = await ShopManager.getWarehouses();
            setWarehouses(warehouses);
        } catch (error) {
            console.error(error);
        }
    };

    fetchWarehouse();
  }, []);

  return (
    <>
        <div className="d-flex justify-content-end mb-3">
            <select
                className="form-select w-auto"
                value={view}
                onChange={(e) => setView(e.target.value)} 
            >
                <option value={VIEW.LIST}>View list</option>
                <option value={VIEW.GRID}>View grid</option>
            </select>
        </div>

        {view === VIEW.LIST && (
            <div className="list-group">
                <WarehouseSelectItem 
                    warehouses={warehouses} 
                    variant="list" />
            </div>
        )}

        {view === VIEW.GRID && (
            <div className="row g-3">
                <WarehouseSelectItem
                    warehouses={warehouses}
                    variant="grid" />
            </div>
        )}
    </>
  );
}

export default WarehouseSelect;
