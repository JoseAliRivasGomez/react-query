import './App.css'
import { useRandom } from './hooks/useRandom';

export const App = () => {

  const query = useRandom();

  return (
    <div className="App">
      {
        query.isFetching 
        ? (<h2>Cargando...</h2>)
        : !query.isError && (<h2>Numero aleatorio: {query.data}</h2>)
      }

      {
        !query.isFetching && query.isError && (<h2>{`${query.error}`}</h2>)
      }

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {
          query.isFetching ? '...' : 'Nuevo numero'
        }
      </button>
      
    </div>
  );
}


