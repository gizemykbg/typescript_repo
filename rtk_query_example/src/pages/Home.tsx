import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "../services/contactsApi";
import "./Home.css";

const Home = () => {
  const { data, isLoading, error } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  console.log();
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  if (isLoading) {
    return <h3>Loading....</h3>;
  }

  const handleDelete = async (id: any) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact?")
    ) {
      await deleteContact(id);
      toast.success("Contact Deleted Successfully");
    }
  };

  return (
    <div className="home">
      <Link to="/addContact">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <br />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th className="th">No</th>
            <th className="th">Name</th>
            <th className="th">Email</th>
            <th className="th">Contact</th>
            <th className="th">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: any) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/editContact/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/info/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
