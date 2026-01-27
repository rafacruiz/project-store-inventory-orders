import { useEffect, useState } from "react";
import { ButtonAdd, InputFinder } from "../../../ui";
import * as ShopManager from "../../../../services/shopManager-service";
import WarehouseSelectItem from "../warehouse-select-item/warehouse-select-item";

const VIEW = {
    LIST: "list",
    GRID: "grid",
};

const inpFinderOption = {
    'id': 'product',
    'placeholder': 'Finder products...'
}

function WarehouseSelect() {

    const btnAddOption = {
        'mode': 'success',
        'placement': 'left',
        'title': 'Add warehouse',
        'to': '',
    }

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
            <div className="d-flex justify-content-end py-3 mb-3">
                <div className="me-2"> <ButtonAdd buttonOption={ btnAddOption } /> </div>
                
                <div className="mx-auto me-2 w-100"> <InputFinder /> </div>

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
