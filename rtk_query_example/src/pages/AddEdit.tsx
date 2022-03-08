import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddContactMutation,
  useContactsQuery,
  useUpdateContactMutation,
} from "../services/contactsApi";
import "./AddEdit.css";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { name, email, contact } = formValue;
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useContactsQuery(id!);
  useEffect(() => {
    if (error && id) {
      toast.error("Something went wrong");
    }
  }, [error]);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error("Please enter the input field");
    } else {
      if (!editMode) {
        await addContact(formValue);
        navigate("/");
        toast.success("Contact added successfully");
      } else {
        await updateContact(formValue);
        navigate("/");
        setEditMode(false);
        toast.success("Contact edited successfully");
      }
    }
  };
  return (
    <div className="add-edit">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Contact no"
          value={contact}
          onChange={handleInputChange}
        />
        <input type="submit" value={editMode ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
