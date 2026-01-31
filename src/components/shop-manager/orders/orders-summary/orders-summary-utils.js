
export const groupAndSumOrders = (orders) => {
    const result = {};

    orders.forEach(order => {
        const warehouseId = order.warehouseId;
        const date = order.createdAt.split('T')[0];

        order.lines.forEach(line => {
            const key = `${warehouseId}-${date}-${line.sku}`;

            if (!result[key]) {
                result[key] = {
                    warehouseId,
                    date,
                    sku: line.sku,
                    name: line.name,
                    quantity: 0,
                };
            }

            result[key].quantity += line.quantity;
        });
    });
    return Object.values(result);
};

export const uniqueByWarehouseAndDate = (orders) => {

    const result = orders.reduce((acc, item) => {
        const key = `${item.warehouseId}-${item.date}`;
        
        if (!acc[key]) {
            acc[key] = {
                id: `${item.warehouseId} - ${item.date}`,
                warehouseId: item.warehouseId,
                date: item.date
            }; 
        }

        return acc;
    }, {});

    return Object.values(result);
};