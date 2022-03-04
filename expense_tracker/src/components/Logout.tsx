import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";
import { AppState } from "../store";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.user);
  console.log(data);
  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data.username) return <Redirect to="/login" />;

  return <div>Logging out...</div>;
};

export default Logout;
