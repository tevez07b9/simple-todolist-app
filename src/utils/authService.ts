const API_URL = "https://reqres.in/api";

/**
 * Usually I would have something like the code below
 * token passed in Bearer, but it's a mock api
 *
 */

// instance.interceptors.request.use((config) => {
//     const authUser = authService.getAuthUser();
//     if (authUser) {
//         config.headers['authorization'] = `Bearer ${authUser.access_token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      const { token } = result;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      throw new Error("Login failed");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default AuthService;
