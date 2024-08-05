import { useState } from 'react';
import { Form } from './components/Form';
import { Pdf } from './components/Pdf';
import {parseUUID, isValidURL} from './utils/helpers' ;

async function fetchJSON(id: string) {
  const url = 'https://garage-backend.onrender.com/getListing';

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  };

  try {
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log('Malformed JSON: ', error);
      return {error: 'Malformed JSON: ' + error};
    } else {
      console.log('Fetch Error:', error);
      return {error: 'Fetch Error: ' + error};
    }
  }

};

function App() {

  const [query, setQuery] = useState('');
  const [data, setData] = useState({});

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const target = e.target as HTMLFormElement;
    const query = target.query.value as any;
    if (isValidURL(query) === false) { return; }
    let uuid = parseUUID(query);
    let json = await fetchJSON(uuid);
    setData(json.result.listing);

    target.query.focus();
  }

  const handleQuery = async function (query: string) {
    setQuery(query);
    setData({});
  };

  return (
    <>
      <Form handleSubmit={handleSubmit} 
            query={query} 
            handleQuery={handleQuery}
      />
  
      <div className="mt-6 mb-6">
        {data.hasOwnProperty('listingTitle') && isValidURL(query) === true ? 
          <Pdf {...data} />
        : 'Generate a product invoice by submitting a complete product URL from WithGarage.'}
      </div>
    </>
    
  )
}

export default App;
