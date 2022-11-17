import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import cryptopanic from './cryptopanic.svg';
import './App.css';
import axios from 'axios';
const App = () => {
  const [url, setUrl] = useState<string>('');
  const [data, setData] = useState<any>(null);

  /**
   * Get current URL
   */

  const baseUrl =
    'https://cryptopanic.com/api/v1/posts/?auth_token=3d5ecc4d751a1e41c7806abb343aafeb1b097079&filter=rising';

  useEffect(() => {
    // axios
    //   .get(baseUrl)
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      const url = tabs[0].url;
      url && setUrl(url);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={cryptopanic} alt="logo" />
        <p>News:</p>
        <p>{url}</p>
        <p>{data}</p>
      </header>
    </div>
  );
};

export default App;
