import Header from "./components/Header/Header";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <Header /> {/* Header her sayfada görünsün diye dışarıda tutuyoruz */}
      <main>
        <AppRouter />
      </main>
    </>
  );
}

export default App;