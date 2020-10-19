import React, {useEffect, useState} from 'react';
import './styles.less';

import ShowTodos from "./ToDos";
import Category from '../../components/CategoryDropDown';
import 'react-dropdown/style.css';
import './styles.less';

const Home = () => {
    const [cat, setCat] = useState(null)
    const [deleteMsg, setDeleteMsg] = useState('')
    const [isShowTodos, setShowTodos] = useState(false)
    const [projectData, setProjectData] = useState([])

    const getTodos = param => e => {
        setShowTodos(!isShowTodos)
    };

    function fetchProjects() {
        fetch('/api/getProjects')
            .then(resp =>
                resp.json()
            )
            .then(respJson => setProjectData(respJson))
    }

    useEffect(() => {
        fetchProjects();
    }, []);
    const renderProjectList = (item) => (
        <div>
            <div className="dashboard-button" onClick={getTodos(item.tags.id)}>
            <span
                id={item.tags.id}
                key={item.tags.user_id}>
                {item.project}
            </span>
            </div>
            <ShowTodos cat={cat} setDeleteMsg={setDeleteMsg} projectID={item.tags.id}/>
        </div>
    );
    return (
        <div className="home-container">
            <div className="header-container">
                <h1 className="page-title">{'ToDo App'}</h1>
                <div className="cat-div">
                    <Category setDropDown={setCat}/>
                </div>
            </div>
            <span> <label>{deleteMsg}</label></span>
            <div className="home-buttons-container">
                {projectData.map(renderProjectList)}
            </div>

        </div>
    );
}
export default Home;
