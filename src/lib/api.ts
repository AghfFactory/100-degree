import { User } from "../types/user";

export const fetchUser = async (): Promise<User> => {
  const res = await fetch('https://randomuser.me/api/?results=1&nat=us');
  const data = await res.json();
  return data.results[0];
};