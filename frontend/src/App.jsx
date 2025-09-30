import Produto from "./components/Produto";
import Header from "./components/layout/Header";
import Imagem1 from "./assets/interior-plano-vazio-com-elementos-de-decoracao.jpg";

function App() {
  return (
    <>
      <Header />
      <div className="bg-4 h-[100vh]">
        <Produto />
      </div>
    </>
  );
}

export default App;
