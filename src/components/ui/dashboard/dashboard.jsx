import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registramos los elementos de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Datos de relleno para productos
  const productsData = {
    labels: ["Electronics", "Clothing", "Books", "Toys", "Home"],
    datasets: [
      {
        label: "Stock per Category",
        data: [120, 80, 45, 60, 30],
        backgroundColor: "rgba(0, 123, 255, 0.6)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Datos de relleno para pedidos por tienda
  const ordersData = {
    labels: ["Store A", "Store B", "Store C", "Store D"],
    datasets: [
      {
        label: "Orders",
        data: [15, 30, 22, 18],
        backgroundColor: [
          "rgba(40, 167, 69, 0.6)",
          "rgba(255, 193, 7, 0.6)",
          "rgba(220, 53, 69, 0.6)",
          "rgba(23, 162, 184, 0.6)",
        ],
        borderColor: [
          "rgba(40, 167, 69, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(220, 53, 69, 1)",
          "rgba(23, 162, 184, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos de relleno para stock vs pedidos pendientes
  const stockVsOrdersData = {
    labels: ["Total Stock", "Pending Orders"],
    datasets: [
      {
        label: "Stock vs Orders",
        data: [335, 120],
        backgroundColor: ["rgba(0, 123, 255, 0.6)", "rgba(220, 53, 69, 0.6)"],
        borderColor: ["rgba(0, 123, 255,1)", "rgba(220, 53, 69,1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container my-4">
      <h6 className="mb-4">Warehouse & Orders </h6>

      <div className="row g-4">
        <div className="col-md-6">
            <div className="card h-100">
                <div className="card-header">Products in Stock</div>
                <div className="card-body d-flex align-items-center justify-content-center">
                <div style={{ width: "100%", height: "300px" }}>
                    <Bar data={productsData} options={{ maintainAspectRatio: false }} />
                </div>
                </div>
            </div>
            </div>

            <div className="col-md-6">
            <div className="card h-100">
                <div className="card-header">Orders per Store</div>
                <div className="card-body d-flex align-items-center justify-content-center">
                <div style={{ width: "100%", height: "300px" }}>
                    <Doughnut data={ordersData} options={{ maintainAspectRatio: false }} />
                </div>
                </div>
            </div>
        </div>

        <div className="col-md-12">
          <div className="card">
            <div className="card-header">Stock vs Pending Orders</div>
            <div className="card-body">
              <Line data={stockVsOrdersData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
