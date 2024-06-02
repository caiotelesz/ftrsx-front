import './index.scss';

import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { API_ADDRESS } from '../../Api/constant';

export default function BoxVisualizacao({ item} ) {

  const imgSrc = item.imagem ? `${API_ADDRESS}/${item.imagem.replace(/\\/g, '/')}` : 'assets/images/pecas/teeblack.png';

  const [contador, setContador] = useState(1);

  function aumentar() {
    setContador(contador + 1);
  }

  function diminuir() {
    if (contador > 1) {
      setContador(contador - 1);
    } 
  }

  return(
    
    <section className='section-visu'>
      <div className='card-visu'>
          <div className='box1'>
          
          <img src={imgSrc} alt='camiseta' />

          </div>
          <div className='box2'>
            <h1 className={`${item.nomeProduto}`}>
              {item.nome ?? 'Black shirt Heavy Tee'}
            </h1>

            <p>
            {item.descricao ?? 'descrição'}
            </p>
            
            <div className='botaoTamanho'>
              <h2>Tamanho: </h2>
              <button> P </button>
              <button> M </button>
              <button> G </button>
              <button> GG </button>
            </div>
            
            <div className='botaoValor'>
              <h2>BRL {item.preco?.toFixed(2) ?? '180.00'}</h2>

              <div className="contador">
                <a onClick={diminuir}> - </a>
                <span> {contador} </span>
                <a onClick={aumentar}> + </a>
                
              </div>
              <Link to='https://wa.me/message/5540028922'>
              
              <button>COMPRAR VIA WHATSAPP</button>
              </Link>
            </div>
          
          
        </div>
      </div>
    </section>
  );
}