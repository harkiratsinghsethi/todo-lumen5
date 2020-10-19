import React, {useEffect, useState} from 'react';
import 'react-dropdown/style.css';
import './styles.less';

import Category from '../../../components/CategoryDropDown';
const AddToDo = (params) => {
    const [dropDownDefault,setDropDown]= useState('')
    const [isFormEnabled, setFormEnabled] = useState(false);
    const [todoName, setTodoName] = useState('');
    const addButtonClicked = () => {
        setFormEnabled(true)
    }
    const handleChange = (e) => {
        const todoName = e.target.value;
        setTodoName(todoName);
    }
    const addToDoInDB = () => {
        fetch(`/api/addTodo?todo=${todoName}&projectid=${params.projectId}&category=${dropDownDefault}`)
            .then(res => {
                if (res.status === 200) {
                    params.setDeleteMsg("Todo Created Successfully")
                    params.fetchTodos()
                }

            })
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        addToDoInDB();
    }
    const handleCloseClick = (e) => {
        e.preventDefault();
        setFormEnabled(false)
    }
    return (
        <div>
            {isFormEnabled ?
                <div>
                    <form onSubmit={handleSubmitClick}>
                        <div className="add-todo-container">
                            <div className="form-group text-left addTodoBar">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="todo"
                                    placeholder="Enter Todo Name"
                                    value={todoName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Category setDropDown={setDropDown}/>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Add Todo
                        </button>
                        <button
                            type="submit"
                            className="btn btn-danger btn-margin"
                            onClick={handleCloseClick}
                        >
                            Close
                        </button>

                    </form>
                </div> : ''}

            <div className="d-flex justify-content-center">
                <div>
                    <button className="addButton addButton5" onClick={() => {
                        addButtonClicked()
                    }}>
                        +
                    </button>
                    <label>Add Todo</label>
                </div>
            </div>

        </div>
    );
};

export default AddToDo;
