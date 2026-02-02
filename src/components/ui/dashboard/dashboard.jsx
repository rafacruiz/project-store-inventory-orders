import React, { useEffect, useRef } from "react";

const Dashboard = () => {
  const productsCanvas = useRef(null);
  const ordersCanvas = useRef(null);
  const stockCanvas = useRef(null);

  const productsChart = useRef(null);
  const ordersChart = useRef(null);
  const stockChart = useRef(null);

  useEffect(() => {
    // 🔥 Destroy previous charts if they exist
    if (productsChart.current) productsChart.current.destroy();
    if (ordersChart.current) ordersChart.current.destroy();
    if (stockChart.current) stockChart.current.destroy();

    // Products in Stock (Bar)
    productsChart.current = new window.Chart(productsCanvas.current, {
      type: "bar",
      data: {
        labels: ["Banana", "Broccoli", "Lemon", "Potato", "Apple"],
        datasets: [
          {
            label: "Stock per Category",
            data: [120, 80, 45, 60, 30],
            backgroundColor: "rgba(0, 123, 255, 0.6)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Orders per Store (Doughnut)
    ordersChart.current = new window.Chart(ordersCanvas.current, {
      type: "doughnut",
      data: {
        labels: ["Shop 1", "Shop 2", "Shop 3"],
        datasets: [
          {
            data: [15, 30, 22],
            backgroundColor: [
              "rgba(40, 167, 69, 0.6)",
              "rgba(255, 193, 7, 0.6)",
              "rgba(220, 53, 69, 0.6)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Stock vs Pending Orders (Line)
    stockChart.current = new window.Chart(stockCanvas.current, {
      type: "line",
      data: {
        labels: ["Total Stock", "Pending Orders"],
        datasets: [
          {
            label: "Stock vs Orders",
            data: [335, 120],
            borderColor: "rgba(0, 123, 255, 1)",
            backgroundColor: "rgba(0, 123, 255, 0.3)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // 🧹 Cleanup when component unmounts
    return () => {
      if (productsChart.current) productsChart.current.destroy();
      if (ordersChart.current) ordersChart.current.destroy();
      if (stockChart.current) stockChart.current.destroy();
    };
  }, []);

  return (
    <div className="container my-4">
      <h6 className="mb-4">Warehouse & Orders</h6>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">Products in Stock</div>
            <div className="card-body">
              <div style={{ height: "300px" }}>
                <canvas ref={productsCanvas} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">Orders per Store</div>
            <div className="card-body">
              <div style={{ height: "300px" }}>
                <canvas ref={ordersCanvas} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card">
            <div className="card-header">Stock vs Pending Orders</div>
            <div className="card-body">
              <canvas ref={stockCanvas} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
