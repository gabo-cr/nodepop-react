import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <Routes>
      <Route 
        path="/login"
        element={
          <LoginPage />
        }
      />
    </Routes>
  );
}

export default App;
