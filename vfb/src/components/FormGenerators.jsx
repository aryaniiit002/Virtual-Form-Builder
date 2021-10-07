import React, { useState, useEffect } from "react";
import { FormGenerator as GeneratedForm } from 'cb-react-forms';
import api from '../api/forms';
import { useParams, useHistory } from "react-router-dom";


const FormGenerators = () => {

    const { formId } = useParams();
    let history = useHistory();

    const [form, setForm] = useState([]);

    // Retrieve Forms 
    const retrieveForms = async (id) => {
        const response = await api.get(`/forms/${id}`)
            .catch((err) => {
                console.log("Err: ", err);
            });

        if (response) {
            setForm(response.data);
        }
        else alert("Wrong Form ID")
    }

    useEffect(() => {
        if (formId && formId !== "") retrieveForms(formId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formId])

    const onSubmitHandler = (data) => {
        console.log(data)
        alert("Form submitted! ");
        history.push("/");

    }
    return (
        <div>
            {form.length !== 0 && (<>
                <GeneratedForm
                    formData={form.data}
                    onSubmit={data => { onSubmitHandler(data) }}
                />
            </>)
            }
        </div>
    )
}

export default FormGenerators;
