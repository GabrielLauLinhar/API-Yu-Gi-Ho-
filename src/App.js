import React, { useState, useEffect } from 'react'; /* Estamos importando o React pra criar nosso componente e o Axios pra fazer a requisição pra API. O ./App.css */
import axios from 'axios';
import './App.css';

const App = () => { /*Aqui a gente define as váriaveis de estado*/ 
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { /* faz com que a função fetchCards seja chamada quando o componente é montado.*/
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        setCards(response.data.data);  
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar as cartas:', error);
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return ( /*Aqui comecei o hmtl para organizar tudo */
    <div className="App">
      <h1>Informações das Cartas de Yu-Gi-Oh!</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <h2>{card.name}</h2>
              <p><strong>Tipo:</strong> {card.type}</p>
              <p><strong>Descrição:</strong> {card.desc}</p>
              <img src={card.card_images[0].image_url} alt={card.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
