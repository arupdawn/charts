import React from "react";
import "./Customers.css";
import { DataGrid } from "@material-ui/data-grid";

function Customers({db}) {
  const columns = [
    { field: "id", headerName: "ID", width: 320 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "created", headerName: "Created", width: 270 },
    { field: "orders", headerName: "Orders", width: 90 }
  ];

  let rows = db.customers.map((customer) => {
    let date = new Date(customer.created);
    let day = date.toUTCString();
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      created: day,
      orders: customer.orders,
    };
  });

  return (
    <div className="customers">
      <div style={{ height: 400}} >
        <h2>Customers</h2>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
}

export default Customers;
