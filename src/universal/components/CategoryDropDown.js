import Dropdown from "react-dropdown";
import React, {useState} from "react";
import 'react-dropdown/style.css';

const options = [
    'Home', 'Work'
];

const Category = ({setDropDown}) => {
    return (
        <div>
            <Dropdown className="category" options={options} onChange={(e) => setDropDown(e.value)}
                      placeholder="Category"/>;
        </div>
    )
}

export default Category;
