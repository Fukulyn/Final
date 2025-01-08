import { useState, useEffect } from "react";
import { asyncGet } from "../utils/fetch";
import { api } from "../enum/api";
import "../style/RootTemplate.css";
import Navigation from "../components/Navigation";
import { Student } from "../interface/Student";

export default function RootTemplate() {
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [selectedWorks, setSelectedWorks] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    // 獲取所有屬性和工作類型
    const allAttributes = Array.from(new Set(students.map(student => 
        student.attribute.split(',').map(attr => attr.trim())).flat()));
    const allWorks = Array.from(new Set(students.map(student => 
        student.workCompatibility.split(',').map(work => work.trim())).flat()));

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await asyncGet(api.findAll);
                if (response?.code === 200) {
                    setStudents(response.body);
                    setFilteredStudents(response.body);
                } else {
                    setIsError(true);
                    setMessage("無法載入資料");
                }
            } catch (error) {
                setIsError(true);
                setMessage("請求失敗，請檢查伺服器連接");
            }
        }
        fetchStudents();
    }, []);

    // 處理排序
    const handleSort = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        const sorted = [...filteredStudents].sort((a, b) => {
            return newOrder === 'asc' 
                ? parseInt(a.id) - parseInt(b.id)
                : parseInt(b.id) - parseInt(a.id);
        });
        setFilteredStudents(sorted);
    };

    // 處理篩選
    const handleFilter = () => {
        let filtered = [...students];

        if (selectedAttributes.length > 0) {
            filtered = filtered.filter(student => 
                selectedAttributes.some(attr => 
                    student.attribute.split(',').map(a => a.trim()).includes(attr)
                )
            );
        }

        if (selectedWorks.length > 0) {
            filtered = filtered.filter(student => 
                selectedWorks.some(work => 
                    student.workCompatibility.split(',').map(w => w.trim()).includes(work)
                )
            );
        }

        setFilteredStudents(filtered);
    };

    // 處理屬性選擇
    const handleAttributeChange = (attribute: string) => {
        const newSelected = selectedAttributes.includes(attribute)
            ? selectedAttributes.filter(a => a !== attribute)
            : [...selectedAttributes, attribute];
        setSelectedAttributes(newSelected);
    };

    // 處理工作選擇
    const handleWorkChange = (work: string) => {
        const newSelected = selectedWorks.includes(work)
            ? selectedWorks.filter(w => w !== work)
            : [...selectedWorks, work];
        setSelectedWorks(newSelected);
    };

    useEffect(() => {
        handleFilter();
    }, [selectedAttributes, selectedWorks]);

    return (
        <>
            <Navigation />
            <div className="root_template">
                {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
                
                <div className="filter_container">
                    <div className="filter_section">
                        <h3>屬性篩選</h3>
                        <div className="checkbox_group">
                            {allAttributes.map(attr => (
                                <label key={attr} className="checkbox_label">
                                    <input
                                        type="checkbox"
                                        checked={selectedAttributes.includes(attr)}
                                        onChange={() => handleAttributeChange(attr)}
                                    />
                                    {attr}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter_section">
                        <h3>工作適配性篩選</h3>
                        <div className="checkbox_group">
                            {allWorks.map(work => (
                                <label key={work} className="checkbox_label">
                                    <input
                                        type="checkbox"
                                        checked={selectedWorks.includes(work)}
                                        onChange={() => handleWorkChange(work)}
                                    />
                                    {work}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="sort_section">
                        <button onClick={handleSort}>
                            ID {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>

                <div className="student-list">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                            <div className="student-card" key={student._id}>
                                <div className="student-info">
                                    <img
                                        src={student.image || "https://via.placeholder.com/150"}
                                        alt={`${student.name} 的圖片`}
                                        className="student-image"
                                    />
                                    <h3>{student.name}</h3>
                                    <p>No. {student.id}</p>
                                    <p>屬性: {student.attribute}</p>
                                    <p>工作適配性: {student.workCompatibility}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>尚未載入資料</p>
                    )}
                </div>
            </div>
        </>
    );
}
