import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment/moment";
import API from "../../services/API";
const OrganisationList = () => {
  const [data, setData] = useState([]);

  const getDonar = async () => {
    try {
      const { data } = await API.get("/admin/organisations-list");
      if (data?.success) {
        setData(data.organisations);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are you sure want to delete donar", "sure");
      if (!answer) {
        return;
      }
      const { data } = await API.delete(`/admin/delete-donar/${id}`);

      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log("error while deleting donar" + error);
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
            <th scope="col">Hospital Email</th>
            <th scope="col">Address</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name + "(ORG)"}</td>
              <td>{record.phone}</td>
              <td>{record.email}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};
export default OrganisationList;
