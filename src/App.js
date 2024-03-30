import React from 'react';
import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   fetch('https://dummyjson.com/auth/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       username: 'kminchelle',
  //       password: '0lelplR',
  //       expiresInMins: 30
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error logging in:', error);
  //   });
  // }
  

  return (
    <div className="App">
      <Header/>
      <ProductList />
    </div>
  );
}

export default App;
