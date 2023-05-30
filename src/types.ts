export interface User {
  name: string;
  email: string;
  token: string;
}

export interface Todo {
  id: string;
  text: string;
  checked: boolean;
  todos?: Todo[];
}
