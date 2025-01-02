import { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { Student } from '../interface/Student';
import { resp } from '../interface/resp';
import Navigation from '../components/Navigation';

function App() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const cache = useRef<boolean>(false);

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code == 200) {
          setStudents(res.body);
        }
      });
    }
  }, []);

  const studentList = students.map((student: Student) => {
    return (
      <div className='student-card' key={student._id}>
        <h3>{student.name}</h3>
        <p>學生日: {student._id}</p>
        <p>帳號: {student.userName}</p>
        <p>座號: {student.sid}</p>
        <p>系級: {student.department}</p>
        <p>Email: {student.email}</p>
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
