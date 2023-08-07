import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Donar = () => {
  const [data, setData] = useState([]);

  const getDonar = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");
      if (data?.success) {
        setData(data.donars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonar();
  }, []);

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">donar email</th>
            <th scope="col">address</th>
            <th scope="col">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organisation + "(ORG)"}</td>
              <td>{record.phone}</td>
              <td>{record.email}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Donar;
