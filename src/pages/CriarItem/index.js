import "./index.scss";

import { toast } from "react-toastify";

import Cabecalho from "../../components/Cabacalho";
import Footer from "../../components/Footer";
import { useState } from "react";

import * as roupasApi from "../../Api/roupasApi";

/* 
<input type="file" accept="image, text" name="file" onChange={e => setImage(e.target.files[0])} />
<button>atualizar</button> 
*/
export default function CriarItem() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [material, setMaterial] = useState("");
  const [imgRoupa, setImgRoupa] = useState("");
  const [imgPreview, setImgPreview] = useState(null);

  async function adicionarRoupa() {

    const formData = new FormData();

    try {
      let corp = {
        "nome": nome,
        "desc": descricao,
        "preco": preco,
        "tam": tamanho,
        "mat": material,
        "img": formData.append('image', imgRoupa)
      };

      if (id === "") {
        let info = await roupasApi.adicionarRoupa(corp);
        alert("Roupa adicionada em: " + info.id);
      }

      limparCampos();

    } catch (error) {
      toast.error("Erro ao adicionar roupa: " + error.message);
    }
  }

  function limparCampos() {
    setId("");
    setNome("");
    setDescricao("");
    setPreco("");
    setTamanho("");
    setMaterial("");
    setImgRoupa(null);
    setImgPreview(null);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if(file) {
      setImgRoupa(file);
      setImgPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="page-criar">
      <Cabecalho />

      <div className="container-criar">
        <div className="primeiraCaixa">
          <div>
            <h2>Nome: </h2>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <h2>Descrição: </h2>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div>
            <h2>Preço: </h2>
            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
          <div>
            <h2>Tamanho: </h2>
            <select
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
            >
              <option value="">Selecione um tamanho</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
            </select>
          </div>
          <div>
            <h2>Material: </h2>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">Selecione um material</option>
              <option value="Algodão">Algodão</option>
              <option value="Denim">Denim</option>
              <option value="Lã">Lã</option>
              <option value="Moletom">Moletom</option>
            </select>
          </div>
        </div>
        
          <div className="segunda-caixa">
            <div>
              {imgPreview && <img src={imgPreview} alt="pré-visualização"style={{ marginTop: '10px', maxWidth: '200px', maxHeight: '200px' }} />}
                
                
                <label htmlFor="imagemInput">Adicionar Imagem</label>
                
                <input
                  type="file"
                  id="imagemInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
            </div>
            
            <button onClick={adicionarRoupa}>Adicionar roupa</button>
            
          </div>
        
      </div>

      <Footer />
    </div>
  );
}
