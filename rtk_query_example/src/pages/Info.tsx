import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useContactsQuery } from "../services/contactsApi";

import "./Info.css";

const Info = () => {
  const { id } = useParams();
  const { data, error } = useContactsQuery(id!);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);
  return (
    <div className="info">
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{data && data.name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{data && data.email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{data && data.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
