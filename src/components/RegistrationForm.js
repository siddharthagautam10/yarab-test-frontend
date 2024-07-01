import React, {useState} from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    /*
    firstName First Name – Only String with Minimum 3 characters
    lastName Last Name – Only String with Minimum 2 characters
    email Email – Normal email validation
    phone Phone (UK) – Should validate if starts with 0, it should be 11 characters. If starts with other
    numbers it should be 10 characters.
    postcode Postcode (UK) – Sample: WD180 GX
    */
   const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postcode: '',
   });

   const [errors, setErrors] = useState({});
   const [message, setMessage] = useState('');
   

   // handleChange
   const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value});
   }

   // validation
   const validate = () => {
        const errors = {};
        // patterns need to entered later
        const emailPattern = /\S+@\S+\.\S+/;
        const phonePattern = /^0\d{10}$/; // starts with 0, it should be 11 characters.
        const postcodePattern = /^0\d{6}$/; // Sample: WD180 GX /^[A-Z]{1,2}\d{1,2}\[A-Z]{1,2}$/;  // 
        if(!formData.firstName || formData.firstName.length < 3){
            errors.firstName = "First name must be at least 3 character";
        }
        if(!formData.lastName || formData.lastName.length < 2){
            errors.lastName = "Last name must be at least 2 character";
        }
        if(!formData.email || !emailPattern.test(formData.email)){
            errors.email = "Invalid email";
        }
        if(!formData.phone || !phonePattern.test(formData.phone)){
            errors.phone = "Invalid phone";
        }
        if(!formData.postcode || !postcodePattern.test(formData.postcode)){
            errors.postcode = "Invalid postcode";
        }
        return errors;
   }

   // Submit from
   const handleSubmit = async (e) => {
        e.preventDefault();
        // validate here
        const errors = validate();
        if(Object.keys(errors).length > 0){
            // clg
            setErrors(errors);
            console.log('Error');
        }else{
            setErrors(errors);
            try{
                const url = 'http://localhost:5000/api/register';
                const response = await axios.post(url, formData);
                const message = response.data.message;
                console.log(message);
                // display success message
                setMessage(message);
            }catch (error){
                // display err msg

                setMessage('Registration failed');
            }
            // submit if validated
            // Axios api call | post
            // if api response 
            //console.log('Ready to submit');
        }

   }

   return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <div>
                <label>Last Name</label>
                <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <p>{errors.lastName}</p>}
            </div>
            <div>
                <label>Email</label>
                <input type='text' name='email' value={formData.email} onChange={handleChange} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Phone</label>
                <input type='text' name='phone' value={formData.phone} onChange={handleChange} />
                {errors.phone && <p>{errors.phone}</p>}
            </div>
            <div>
                <label>Postcode</label>
                <input type='text' name='postcode' value={formData.postcode} onChange={handleChange} />
                {errors.postcode && <p>{errors.postcode}</p>}
            </div>
            <div>
                <button type='submit'>Register</button>
                {message && <p>{message}</p>}
            </div>
        </form>
   )
}
export default RegistrationForm;