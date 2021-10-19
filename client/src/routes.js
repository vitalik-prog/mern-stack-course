import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/links' component={LinksPage} exact />
        <Route path='/create' component={CreatePage} exact />
        <Route path='/detail/:id' component={DetailPage} />
        <Redirect to='/links' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/' component={AuthPage} exact />
      <Redirect to='/' />
    </Switch>
  )

}
