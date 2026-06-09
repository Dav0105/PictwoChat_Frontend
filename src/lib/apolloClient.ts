import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const httpLink = new HttpLink({
  uri: BACKEND_URL,
});

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;