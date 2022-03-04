import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout } from "antd";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import Headers from "./components/Headers";
import Logout from "./components/Logout";
function App() {
  const { Content, Footer } = Layout;
  return (
    <>
      <Layout>
        <Headers />
        <Content
          className="site-layout"
          style={{ padding: "50px", marginTop: 64 }}
        >
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/categories" component={Categories} />
          <PrivateRoute path="/records" component={Records} />
        </Content>
        <Footer style={{ textAlign: "center" }}>Expense Tracker</Footer>
      </Layout>
    </>
  );
}

export default App;
