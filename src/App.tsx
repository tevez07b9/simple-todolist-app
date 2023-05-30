import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Homepage from "./routes/Homepage";
import Login from "./routes/login";
import { TodoProvider } from "./context/TodosContext";

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isFetching && !auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <Routes>
          <Route>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Homepage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;
