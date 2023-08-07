import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventorydata, setInventoryData] = useState([]);
  const colors = [
    "#ACFADF",
    "#CECE5A",
    "#FFE17B",
    "#C51605",
    "#FD8D14",
    "#8062D6",
    "#9288F8",
    "#FFD2D7",
  ];

  const getData = async () => {
    const { data } = await API.get("/analytics//bloodGroups-data");
    if (data?.success) {
      setData(data?.bloodGroupData);
    }
  };
  const getBloodRecord = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getBloodRecord();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
            key={record.bloodGroup}
          >
            <div className="card-body">
              <h5 className="card-title bg-light text-dark text-center mb-3">
                {record.bloodGroup}
              </h5>

              <p className="card-text">
                Total In: <b>{record.totalIn}</b>
              </p>
              <p className="card-text">
                Total Out: <b>{record.totalOut}</b>
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Available Blood: <b>{record.availableBlood}</b>
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-3">
        <h1 className="my-3">Recent Transactions</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">quantity</th>
              <th scope="col">donar email</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {inventorydata?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
