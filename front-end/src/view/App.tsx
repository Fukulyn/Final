import { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { Pals } from '../interface/pals';
import { resp } from '../interface/resp';
import Navigation from '../components/Navigation';

function App() {
  const [students, setStudents] = useState<Array<Pals>>([]);
  const cache = useRef<boolean>(false);

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Pals>>) => {
        if (res.code == 200) {
          setStudents(res.body);
        }
      });
    }
  }, []);

  const studentList = students.map((student: Pals) => {
    return (
      <div className='student-card' key={student._id}>
        <h3>{student.name}</h3>
        <p>名稱: {student.name}</p>
        <p>編號: {student.id}</p>
        <p>屬性: {student.attribute}</p>
        <p>工作屬性: {student.workCompatibility}</p>
        <img src={student.image} alt={student.name} />
      </div>
    );
  });

  return (
    <>
      <Navigation />
      <div className='container'>
        <div className='student-list'>{studentList}</div>
      </div>
    </>
  );
}

export default App;
