import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [historialPrecios, setHistorialPrecios] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbol = 'bitcoin';  // Puedes cambiar a otro símbolo si es necesario
        const intervalo = 60;  // Intervalo en minutos (1 hora en este caso)
        const limite = 20;

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              interval: 'minute' + intervalo,
              from: Math.floor((Date.now() - intervalo * 60 * 1000 * limite) / 1000),
              to: Math.floor(Date.now() / 1000),
            },
          }
        );

        const precios = response.data.prices;
        const ultimosPrecios = precios.slice(-limite).map((precio: number[]) => precio[1]);

        setHistorialPrecios(ultimosPrecios);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Historial de Precios</h1>
      <ul>
        {historialPrecios.map((precio, index) => (
          <li key={index}>Hora {index + 1}: ${precio.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
