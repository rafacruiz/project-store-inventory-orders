
import { useEffect, useState } from "react";
import { AlertMessage, ButtonAdd, InputFinder, Loader } from "../../../ui";
import WarehouseSelectItem from "../warehouse-select-item/warehouse-select-item";
import * as ShopManager from "../../../../services/shopManager-service";

const VIEW = {
    LIST: "list",
    GRID: "grid",
};

const inpFinderOption = {
    'id': 'warehouses',
    'placeholder': 'Finder warehouses...'
}

function WarehouseSelect() {

    const btnAddOption = {
        'mode': 'success',
        'placement': 'left',
        'title': 'Add warehouse',
        'to': '',
    }

    const [warehouses, setWarehouses] = useState(null);
    const [search, setSearch] = useState('');
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

    if (warehouses === null) return <Loader />;

    if (!warehouses?.length) return <AlertMessage message='No products available' />;

    return (
        <>
            <div className="d-flex justify-content-end py-3 mb-3">
                <div className="me-2"> <ButtonAdd buttonOption={ btnAddOption } /> </div>
                
                <div className="mx-auto me-2 w-100"> 
                    <InputFinder 
                        onChange={ setSearch } 
                        inputOption={ inpFinderOption } 
                    /> 
                </div>

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
                        variant="list"
                        search={search} />
                </div>
            )}

            {view === VIEW.GRID && (
                <div className="row g-3">
                    <WarehouseSelectItem
                        warehouses={warehouses}
                        variant="grid"
                        search={search} />
                </div>
            )}
        </>
    );
}

export default WarehouseSelect;
