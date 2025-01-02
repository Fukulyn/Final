import { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { Pals } from '../interface/pals';
import { resp } from '../interface/resp';
import Navigation from '../components/Navigation';

function App() {
  const [pals, setPals] = useState<Array<Pals>>([]);
  const cache = useRef<boolean>(false);

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Pals>>) => {
        if (res.code == 200) {
          setPals(res.body);
        }
      });
    }
  }, []);

  const palsList = pals.map((pal) => {
    return (
      <div className='pal-card' key={pal._id}>
        <h3>{pal.name}</h3>
        <p>名稱: {pal.name}</p>
        <p>編號: {pal.id}</p>
        <p>屬性: {pal.attribute}</p>
        <p>工作屬性: {pal.workCompatibility}</p>
        <img src={pal.image} alt={pal.name} />
      </div>
    );
  });

  return (
    <>
      <Navigation />
      <div className='container'>
        <div className='pal-list'>{palsList}</div>
      </div>
    </>
  );
}

export default App;
