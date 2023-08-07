import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column">
          <h1>
            {" "}
            Welcome Admin <i className="text-danger">{user?.name}</i>
          </h1>
          <h3>Manage Blood bank App</h3>
          <hr />
          <p>
            The administrator of a page plays a crucial role in managing and
            maintaining the online presence of a website or platform. As the
            person responsible for overseeing the page's operations, the admin
            wields significant authority and responsibilities. They have the
            power to control user access, moderate content, and ensure a safe
            and engaging environment for the community. Admins must possess
            excellent communication skills to engage with users, address
            concerns, and enforce community guidelines. They also handle
            technical aspects, such as updates, backups, and security measures.
            A proactive and adaptable admin fosters growth, encourages
            interactions, and builds a positive brand image, contributing to the
            page's success and credibility.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
