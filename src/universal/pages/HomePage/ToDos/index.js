import React, {useEffect, useState} from 'react';
import ReactTable from 'react-table';
import './styles.less'
import AddToDo from "./AddToDo";
import {filterTodos} from './ToDoHelper'

const ShowTodos = (props) => {
    const [todoData, setTodoData] = useState([])
    const [checked,setCheckBox]=useState(false)
    const todayDate = new Date();
    console.log(JSON.stringify(todoData))
    function fetchTodos() {
        fetch(`/api/fetchTodos?projectid=${props.projectID}`)
            .then(resp =>
                resp.json()
            )
            .then(respJson => respJson.map(item => ({
                    ID: item.id,
                    TITLE: item.title,
                    STATE: item.state,
                    DUE_DATE: item.due_date,
                    CATEGORY: item.category

                })
            ))
            // .then(response => setTodoData(props.cat ? response.filter(item => item.CATEGORY === props.cat) : response))
            .then(response => setTodoData(filterTodos(response,props.cat)));
    }

    useEffect(() => {
        fetchTodos();
    }, [props.cat]);


    const handleInputChange = v => event => {
        let data = [...todoData];
        data[v.index][v.column.id] = event.target.value;
        setTodoData(data)
    }
    const renderEditable = cellInfo => {
        const cellValue = todoData[cellInfo.index][cellInfo.column.id];
        return (
            <input
                placeholder="type here"
                name="input"
                type="text"
                onChange={handleInputChange(cellInfo)}
                value={cellValue}
                autoFocus
            />
        )
    }

    const handleCB = (e, v) => {
        setCheckBox(!checked)
    }
    const renderStateCB = (row) => {
        return (
            <label>
                <input
                    id = {Math.random()}
                    name="isGoing"
                    type="checkbox"
                    checked={checked}
                    value="Done"
                    key={Math.random()}
                    onChange={(e) => handleCB(e, row)}
                />
                Done?
            </label>)
    }

    return (
        <div>
            <h3 className="page-title ">{"ToDo's"}</h3>
            {/*{setTodoData(todoData.filter(item => item.CATEGORY === props.cat))}*/}
            {/*{console.log(props.cat)}*/}
            <ReactTable
                data={todoData}
                columns={[
                    {
                        Header: 'TITLE',
                        accessor: 'TITLE',
                        width: 200
                    },
                    {
                        Header: 'STATE',
                        width: 200,
                        Cell: row => renderStateCB(row)
                        // Cell: row => isEditTodo && isShowEditableCell && row.index === editIndexValue ?
                        //     renderEditableDropDown(row, row.index) : row.value
                    },
                    {
                        Header: 'Category',
                        accessor: 'CATEGORY',
                        width: 200
                    },
                    {
                        Header: 'DUE DATE',
                        accessor: 'DUE_DATE',
                        width: 200,
                        Cell: row => (
                            <div
                                style={{
                                    height: '100%',
                                    backgroundColor: new Date(row.value) < todayDate ? '#b18379' : '#a0c489'
                                }}
                            >
                                {row.value}{
                            }
                            </div>
                        )
                    }
                ]}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
            />
            <AddToDo fetchTodos={fetchTodos} setDeleteMsg={props.setDeleteMsg} projectId={props.projectID}/>
        </div>

    )
}

export default ShowTodos
