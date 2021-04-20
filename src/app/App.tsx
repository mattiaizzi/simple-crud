import React from 'react';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { EditUserPage } from './pages/EditUserPage/EditUserPage';
import { UserDetailPage } from './pages/UserDetailPage/UserDetailPage';
import { CreateUserPage } from './pages/CreateUserPage/CreateUserPage';
import { Navbar } from './shared/Navbar/Navbar';
import { Box } from '@material-ui/core';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Box p={2}>
          <Switch>
            <Route path="/users" exact>
              <UsersPage />
            </Route>
            <Route path="/users/create-user" exact>
              <CreateUserPage />
            </Route>
            <Route path="/users/:id" exact component={UserDetailPage} />
            <Route path="/users/:id/edit" exact component={EditUserPage} />
            <Route path="*">
              <Redirect to="users" />
            </Route>
          </Switch>
        </Box>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
