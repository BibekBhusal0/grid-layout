import "./App.css";
import Footer from "./components/footer";
import Grid from "./components/grid";

function App() {
  const appSize = 95;
  return (
    <div className="size-full h-screen p-3 overflow-auto bg-[#0D1117] text-white relative">
      <Grid height={appSize} />
      <Footer />
    </div>
  );
}

export default App;
