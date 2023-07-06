import "./App.css";
import Weather from "./Weather";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <Weather />
      </QueryClientProvider>
    </>
  );
}

export default App;
