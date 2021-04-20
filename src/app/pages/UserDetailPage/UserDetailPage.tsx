import React from 'react';
import { RouteComponentProps } from 'react-router';

interface UserDetailPageProps {
  id: string;
}

export const UserDetailPage: React.FC<RouteComponentProps<UserDetailPageProps>> = ({ match }) => {
  return <h1>User detail page {match.params.id}</h1>;
};
