import { useEffect, useReducer, useState } from 'react'
import './App.css'

const getRandomNumberFromApi = async (): Promise<number> => {

  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const numberString = await res.text();
  //throw new Error('Not found');
  return +numberString;

}

export const App = () => {

  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    
    setIsLoading(true);
    getRandomNumberFromApi()
      .then(n => setNumber(n))
      .catch(error => setError(error.message));
  
  }, [key]);

  useEffect(() => {
    
    if(number) setIsLoading(false);
    
  }, [number]);
  
  useEffect(() => {
    
    if(error) setIsLoading(false);

  }, [error]);
  

  return (
    <div className="App">
      {
        isLoading 
        ? (<h2>Cargando...</h2>)
        : !error && (<h2>Numero aleatorio: {number}</h2>)
      }

      {
        !isLoading && error && (<h2>{error}</h2>)
      }

      <button onClick={forceRefetch} disabled={isLoading}>
        {
          isLoading ? '...' : 'Nuevo numero'
        }
      </button>
      
    </div>
  );
}


