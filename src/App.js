import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [staticData, setStaticData] = useState([]);
  const [dynamicData, setDynamicData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterData();
  }, [query]);

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get("https://thronesapi.com/api/v2/Characters");
    setStaticData(response.data);
    setDynamicData(response.data);
    setIsLoading(false);
  }

  const filterData = () => {
    if (query.trim() !== "") {
      const intermediate = staticData;
      setDynamicData(intermediate.filter(item =>
        item.fullName.toLowerCase().includes(query.trim()) ||
        item.title.toLowerCase().includes(query.trim()) ||
        item.family.toLowerCase().includes(query.trim())
      ));
    } else {
      setDynamicData(staticData);
    }
  }

  return isLoading ?
  <div className='app-container'>
      <div className='banner-container'>
        <div className='banner'/>
      </div>
      <form>
        <input 
          type="text" 
          className='form-control' 
          placeholder='Search name, title, or family'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </form>
      <div className='loading-container'>
        <h2 className='loading'>Loading...</h2>
      </div>
    </div>  
  :
  (
    <div className='app-container'>
      <div className='banner-container'>
        <div className='banner'/>
      </div>
      <form>
        <input 
          type="text" 
          className='form-control' 
          placeholder='Search name, title, or family'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </form>
      <div className='status'>{dynamicData.length} characters found</div>
      <div className='card-container'>
        {dynamicData.map(item => (
          <div className='card' key={item.id}>
            <h3 className='fullname'>{item.fullName}</h3>
            <img src={item.imageUrl} height='250px' width='250px' alt={item.fullName}/>
            <div>Title: {item.title}</div>
            <div>Family: {item.family}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
