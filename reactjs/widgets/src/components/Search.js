import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // solution one
    const search = async () => {
      const { data } = await axios.get('http://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });

      setResults(data.query.search);
    };

    search();

    // solution two
    // (async = () => {
    //   await axios.get('asdasd');
    // })();

    // solution three - promisses
    // axios.get('asdasd').then((response => { console.log(response.data) }));

  }, [term]);

  const renderResults = results.map((result) => {
    return <div key={result.pageid} className='item'>
      <div className='content'>
        <div className='header'>{result.title}</div>
        {result.snippet}
      </div>
    </div>
  })

  return (
    <div>
      <div className='ui form'>
        <div className='field'>
          <label>Enter Search Term</label>
          <input
            className='input'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className='ui celled list'>{renderResults}</div>
    </div>
  );
}

export default Search;