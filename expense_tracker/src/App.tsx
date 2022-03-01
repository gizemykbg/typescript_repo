import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout, Menu, Breadcrumb } from "antd";
import Login from "./components/Login";
function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "50px", marginTop: 64 }}
        >
          <Route path="/register" element={SignUp} />
          <Route path="/login" element={Login} />
          {/* <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            Content
          </div> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>Expense Tracker</Footer>
      </Layout>
    </>
  );
}

export default App;
