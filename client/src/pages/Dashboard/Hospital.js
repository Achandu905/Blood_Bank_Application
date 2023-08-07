import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Hospital = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log("Error while fetching all hospitals");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>

            <th scope="col">Phone</th>
            <th scope="col">Hospital email</th>
            <th scope="col">Address</th>
            <th scope="col">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organisation + "(ORG)"}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Hospital;
