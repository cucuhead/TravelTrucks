import { Toaster } from "react-hot-toast"; // Yeni import
import Header from "./components/Header/Header";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
    
      <Toaster /> 
      <Header />
      <main>
        <AppRouter />
      </main>
    </>
  );
}

export default App;