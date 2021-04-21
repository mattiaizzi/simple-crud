import axios from 'axios';
import { User } from '../../models/user';

const baseUrl = 'http://localhost:8000/users';

export const getUser = (id: string) => axios.get<User>(`${baseUrl}/${id}`).then((response) => response.data);

export const saveUser = (user: User) =>
  axios.post<User>('http://localhost:8000/users', user).then((response) => response.data);

export const getAllUsers = () => axios.get<User[]>('http://localhost:8000/users').then((response) => response.data);
