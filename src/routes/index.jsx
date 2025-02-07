import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppLayout } from "../layout";

const AppRouter = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <ToastContainer autoClose={2000} />
      </AppLayout>
    </Router>
  );
};

export default AppRouter;
