import React from 'react'
import 'materialize-css'
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

function App() {
  const {login, token, userId, logout, appReady} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!appReady) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, logout, login, userId, isAuthenticated
    }}>
      <BrowserRouter>
        { isAuthenticated && <Navbar /> }
        <div className='container'>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
