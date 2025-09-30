import { useState, useEffect } from "react";
import axios from "axios";

// DECLARANDO A URL DA API QUE SERÁ CONSUMIDA
const API_URL = "http://localhost:5001/produto";

const Produto = () => {
  // HOOK -useState - manipula o estado da variavel

  const [produto, setProduto] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: "", descricao: "" });
  const [editar, setEditar] = useState(false);

  // CADASTRAR PRODUTO (post)
  const cadastrarProduto = async () => {
    // validar campos
    if (!novoProduto.nome || !novoProduto.descricao) {
      alert("campos obrigatórios");
      return;
    }
    try {
      // envia os dados do novo produto para a api usando uma requisição post
      const response = await axios.post(`${API_URL}`, novoProduto);
      // se a requisição for bem-sucedida , atualiza o estado do produto com (spreed ...)
      setProduto([...produto, response.data]);
      // limpa os campos do formulario redefinindo o estado novoProduto
      setNovoProduto({ nome: "", descricao: "" });
      // define o estado editar como false indicando que o botao editar não ativo
      setEditar(false);
    } catch (error) {
      console.log("Erro ao cadastrar o produto", error);
    }
  };

  // CONSULTAR PRODUTO (get)
  const consultarProduto = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setProduto(response.data);
    } catch (error) {
      console.log("erro ao consultar o produto", error);
    }
  };

  useEffect(() => {
    consultarProduto();
  }, []);

  // ALTERAR PRODUTO (put)

  const alterarProduto = async () => {
    // validar campos
    if (!novoProduto.nome || !novoProduto.descricao) {
      alert("campos obrigatórios");
      return;
    }
    // tratamento de erros
    try {
      const response = await axios.put(
        `${API_URL}/${novoProduto.id}`,
        novoProduto
      );
      // se a requisição der certo , atualiza o estado do produto, mapeando a lista de
      //produtos substituindo o item com o id correspondente.
      setProduto(
        produto.map((produto) =>
          produto.id === novoProduto ? response.data : produto
        )
      );
      setNovoProduto({ nome: "", descricao: "" });
      setEditar(false);
    } catch (error) {
      console.log("errro ao alterar produto", error);
    }
  };

  // DELETAR PRODUTO (delete)

  const deletarProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este produto?"))
      try {
        // enviar uma requisição delete para a api usando o di do produto na url
        await axios.delete(`${API_URL}/${id}`);
        //filtra a lista de produtos e remove o produto que possui o id selecionado
        setProduto(produto.filter((produto) => produto.id !== id));
      } catch (error) {
        console.log("errro ao deletar produto", error);
      }
    else {
      console.log("Opção Cancelada");
    }
  };

  // Método alterar
  const handleAlterar = (produto) => {
    setNovoProduto(produto);
    setEditar(true);
  };

  // Método submit que vai atualizar o botão para alterar ou cadastrar no form
  const handleSubmit = () => {
    if (editar) {
      alterarProduto();
    } else {
      cadastrarProduto();
    }
  };

  return (
    <div className="flex justify-between items-center  text-center h-[80vh] pl-40 pr-80">
      <div>
        <h1 className="text-4xl">Cadastro de Produto</h1>
        <form className="flex flex-col bg-1 p-20 gap-5 rounded-2xl mt-3">
          <div>
            <input
              type="text"
              placeholder="Nome do produto"
              value={novoProduto.nome}
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, nome: e.target.value })
              }
              className="border border-2 rounded-2xl text-center"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Valor do produto"
              value={novoProduto.descricao}
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, descricao: e.target.value })
              }
              className="border border-2 rounded-2xl text-center"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="border border-2 rounded-2xl text-center bg-white hover:bg-2"
          >
            {editar ? "Alterar" : "Cadastrar"}
          </button>
        </form>
      </div>
      <ul className="flex flex-col">
        {produto.map((item) => (
          <li key={item.id} className="flex justify-between text-center items-center mt-4 gap-10 bg-3 py-3 px-4 rounded-2xl">
            <div>
              <strong>{item.nome} </strong>
              {item.descricao}
            </div>

            <div className="flex gap-5">
              <button onClick={() => handleAlterar(item)} className="bg-amber-300 hover:bg-amber-500 py-2 px-3 rounded-2xl border border-2">Editar</button>
              <button onClick={() => deletarProduto(item.id)} className="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-2xl border border-2">Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produto;
