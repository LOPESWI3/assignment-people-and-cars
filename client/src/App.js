import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Landing from "./components/layout/Landing";
import SinglePage from "./components/layout/SinglePage";
import { Header } from "antd/es/layout/layout";
// import Contacts from "./components/lists/Contacts";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout className="App">
          <Header/>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="person/:personId" element={<SinglePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
