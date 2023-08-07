import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
import moment from "moment";

const Donations = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await API.post("/inventory/get-hospital-inventory", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log("Error while fetching all hospitals");
    }
  };
  useEffect(() => {
    getData();
  }, [user]);
  return (
    <Layout>
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity(ML)</th>
              <th scope="col">email</th>
              <th scope="col">Date </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
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
    </Layout>
  );
};

export default Donations;
