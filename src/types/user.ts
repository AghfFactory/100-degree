export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  phone: string;
}