import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api/forms';
import { Dropdown, Button } from 'semantic-ui-react';
import _ from 'lodash';

const caseSensitiveSearch = (languageOptions, query) => {
    const re = new RegExp(_.escapeRegExp(query))
    return languageOptions.filter((opt) => re.test(opt.text))
}

function Home() {

    const [forms, setForms] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [dropdownValue, setDropdownValue] = useState("");

    // Retrieve Forms
    const retrieveForms = async () => {
        const response = await api.get("/forms");
        return response.data;
    }

    useEffect(() => {

        const getAllForms = async () => {
            const allForms = await retrieveForms();
            if (allForms) setForms(allForms);
        }

        getAllForms();
    }, [])

    const handleChange = (e, { value }) => {
        setDropdownValue(value)
    }

    const languageOptions = []

    useEffect(() => {
        const handleUpdateForm = () => {
            forms.map(form => {
                let text = form.formName + " . . . " + form.currentDateandTime;
                let key = form.id;
                let value = form.id;

                languageOptions.push({ key, text, value })
                return languageOptions;
            })
        }

        handleUpdateForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageOptions])

    return (
        <div>
            <div className="jumbotron background">
                <div className="container">
                    <div class="home__header">
                        <a href className="hh_a">CREATE YOUR OWN FORMS!</a>
                    </div>
                    <p style={{ marginTop: "60px", fontSize: "18px", letterSpacing: ".8px" }}>
                        This is the <strong style={{ cursor: "pointer" }} onClick={() => window.open("https://www.dubdub.ai/", "_blank")}>Dubdub.ai</strong> virtual form builder, a tool to help
                        you create forms easily.
                    </p>
                    <p>
                        <Link to="/formbuilder">
                            <button type="button" className="btn btn-primary btn-lg home-button">START A NEW FORM</button>
                        </Link>
                        <Dropdown
                            options={languageOptions}
                            placeholder='UPDATE FORM'
                            search={caseSensitiveSearch}
                            onChange={handleChange}
                            selection
                            style={{ fontSize: "16px", top: "5px", width: "290px", backgroundColor: "#007bff", color: "#ffffff" }}
                        />

                        {dropdownValue && (
                            <Link to={`/formgenerator/${dropdownValue}`}>
                                <Button style={{ marginLeft: "10px" }}>Next</Button>
                            </Link>
                        )}
                    </p>
                </div>
            </div>
            <div className="container home-down">
                <div className="row">
                    <div className="col-md-6" style={{ padding: '10px' }}>
                        <h3><i className="glyphicon glyphicon-saved"></i> Account-less</h3>
                        <p>You don't need an account to create a new form: just create and give it to your friends, it's a matter of minutes!</p>
                    </div>
                </div>
            </div>
            <div className="container home-down">
                <div className="row">
                    <div className="col-md-7" style={{ padding: '10px' }}>
                        <h3><i className="glyphicon glyphicon-eye-close"></i> Privacy matters</h3>
                        <p>With <a href="https://www.dubdub.ai/">Dubdub.ai</a>, you are not giving Google or any other giants your data.</p>
                        <p>Our goal is not to host all the forms of the world, so we try to make it easy for you.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
