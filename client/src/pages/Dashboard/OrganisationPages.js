import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";

const OrganisationPages = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-organisation");
        if (data?.success) {
          setData(data?.organisations);
          console.log(data);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get("/inventory/get-organisation-hospital");
        if (data?.success) {
          setData(data?.organisations);
          console.log(data);
        }
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Organisation email</th>
            <th scope="col">Address</th>
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

export default OrganisationPages;
