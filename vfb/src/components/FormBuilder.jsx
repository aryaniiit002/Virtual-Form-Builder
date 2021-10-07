import React, { useState } from "react";
import { FormBuilder as Formbuilder } from "cb-react-forms";
import { uuid } from "uuidv4";
import api from '../api/forms';
import { Link } from 'react-router-dom';

const toolbarItems = [
    {
        key: "TextArea",
        name: "Multi-line Input",
        icon: "fa fa-text-height"
    },
    {
        key: "Checkboxes",
        name: "Checkboxes",
        icon: "fa fa-check-square-o"
    },
    {
        key: "Dropdown",
        name: "Dropdown",
        icon: "fa fa-caret-square-o-down"
    },
    {
        key: "Date",
        name: "Date",
        icon: "fa fa-calendar"
    },
    {
        key: "NumberInput",
        name: "Number Input",
        icon: "fa fa-plus"
    },
    {
        key: "Range",
        name: "Range",
        icon: "fa fa-sliders"
    }
];

const FormBuilder = () => {
    const [formName, setFormName] = useState("");

    const AddFormHandler = async (form) => {

        // Sun May 24 2020 09:59:56 GMT+0530 (India Standard Time)
        const currentDate = Date().toLocaleString()

        const request = {
            id: uuid(),
            formName: formName,
            currentDateandTime: currentDate,
            data: JSON.parse(form)
        }
        // console.log(request)
        await api.post("/forms", request)
        alert("Your form has saved");
    }

    const handleChange = (e) => {
        setFormName(e.target.value);
    }

    return (
        <div className="main">
            <div>
                <h1 className="header" style={{ marginTop: '20px' }}>Dubdub.ai - Virtual Form Builder</h1>
            </div>
            <div className="formname">
                <label class="custom-field two">
                    <span class="placeholder">Form Name</span>
                    <input
                        style={{ marginRight: "50px", marginLeft: "10px", padding: "5px", textAlign: 'center' }} type="text"
                        placeholder="Enter Form Name"
                        onChange={handleChange}
                    />
                    <Link to="/">
                        <button className="hvr-rectangle-in backbtn">Back To Home</button>
                    </Link>
                </label>
            </div>
            <div>
                <Formbuilder
                    onSubmit={
                        data => {
                            if (formName) AddFormHandler(data);
                            else { alert("Enter Form Name") }
                        }
                    }
                    items={toolbarItems}
                />
            </div>
        </div>
    );
}

export default FormBuilder;

