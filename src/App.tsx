import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import RequireAuth from "./components/auth/RequireAuth";
import NewAdvertPage from "./pages/adverts/new/NewAdvertPage";

function App() {
  return (
    <Routes>
      <Route 
        path="/login"
        element={
          <LoginPage />
        }
      />
      <Route 
        path="/adverts"
        element={
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        }>
          <Route index element={<AdvertsPage />} />
          <Route path="new" element={<NewAdvertPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
