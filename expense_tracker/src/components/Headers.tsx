import { Menu, Skeleton, Spin } from "antd";
import { Header } from "antd/lib/layout/layout";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AppState } from "../store";
import { isLoggedIn } from "../store/actions/userActions";

const Headers = () => {
  const { data, loading, error } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const { pathname } = useLocation();

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        {data.username ? (
          <>
            <Menu.Item key="/records">
              <Link to="/records">Records</Link>
            </Menu.Item>

            <Menu.Item key="/categories">
              <Link to="/categories">Category </Link>
            </Menu.Item>

            <Menu.Item key="/logout">
              <Link to="/logout">Logout </Link>
            </Menu.Item>
          </>
        ) : loading ? (
          <Skeleton />
        ) : (
          <Link to="/login">
            <Menu.Item key="/login">Login</Menu.Item>
          </Link>
        )}
      </Menu>
    </Header>
  );
};

export default Headers;
