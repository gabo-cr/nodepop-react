import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import RequireAuth from "./components/auth/RequireAuth";

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
      </Route>
    </Routes>
  );
}

export default App;
