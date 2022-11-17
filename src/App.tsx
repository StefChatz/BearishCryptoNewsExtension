import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import cryptopanic from './cryptopanic.svg';
import { useBrowserNotifications } from 'use-browser-notifications';
import './App.css';
import axios from 'axios';
const App = () => {
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [data, setData] = useState<any>(null);

  const { show } = useBrowserNotifications({
    title: 'test notification',
    body: 'Hello world!',
  });

  /**
   * Get current URL
   */

  const baseUrl =
    'https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_API_KEY_HERE&filter=bearish';

  const getData = async () => {
    axios
      .get(baseUrl)
      .then((res) => {
        // check if latest item is different from current item
        setData(res.data);
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log('rest');

  useEffect(() => {
    //call getData every 5 seconds
    getData();

    const interval = setInterval(() => {
      getData();
      //if latest item is different from current item, send notification
      if (data && data.results[0].id !== data.results[1].id) {
        console.log('send notification');
      }
    }, 31000);
    return () => clearInterval(interval);
  }, []);

  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      const url = tabs[0].url;
    });

  // const handleAllowNotifications = () => {
  //   chrome.notifications.create('', {
  //     title: 'Just wanted to notify you',
  //     message: 'How great it is!',
  //     iconUrl: '/robot-face_1f916.png',
  //     type: 'basic',
  //   });
  // };

  return (
    <div className="App">
      <header className="App-header">
        {
          //list first 5 items
          data?.results.slice(0, 3).map((item: any) => {
            return (
              <div key={item.key}>
                <p style={{ fontSize: 16 }}>{item.title}</p>
              </div>
            );
          })
        }
        <button className="button" onClick={() => show}>
          Show Notification
        </button>

        <p>Data kindly provided by:</p>
        <img src={cryptopanic} alt="logo" />
      </header>
    </div>
  );
};

export default App;
