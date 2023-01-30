import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import { UserBlog } from "./pages/auth/UserBlog";
import SingleBlog from "./pages/SingleBlog";

function App() {
  const { access_token } = useSelector(state => state.auth)
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />} />
            <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/myblog" />} />
            <Route path="/myblog" element={access_token ? <UserBlog /> : <Navigate to="/login" />} />
            <Route path="/blog" element={<SingleBlog />} />
          <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
          </Route>
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
