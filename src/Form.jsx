import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import formFields from './form.json';
import { StyledDiv } from './Styles';

const FormComponent = () => {
  const initialValues = formFields.reduce((values, field) => {
    values[field.id] = field.type === 'checkbox' ? [] : '';
    return values;
  }, {});

  const validate = (values) => {
    const errors = {};

    formFields.forEach((field) => {
      if (field.required && !values[field.id]) {
        errors[field.id] = `${field.name} is required`;
      } else if (field.regex && values[field.id]) {
        const regex = new RegExp(field.regex);
        if (field.type === 'checkbox') {
          if (!values[field.id].every((value) => regex.test(value))) {
            errors[field.id] = `Invalid ${field.name}`;
          }
        } else if (!regex.test(values[field.id])) {
          errors[field.id] = `Invalid ${field.name}`;
        }
      }
    });

    return errors;
  };

  const handleSubmit = (values) => {
    const formattedData = Object.entries(values).map(([key, value]) => {
      const field = formFields.find((f) => f.id === key);
      if (field.type === 'checkbox') {
        return `${field.name}: ${value.map((v) => field.options.find((o) => o.value === v).label).join(', ')}`;
      }
      return `${field.name}: ${value}`;
    });
    alert(`Here's your Submitted Data:\n\n${formattedData.join('\n')}`);
    // Submit form data
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
    
      {({ isSubmitting }) => (
        <Form style={{backgroundColor: "rgba(1, 1, 1, 0.267)", borderRadius: "2rem", paddingTop: "5vh", paddingLeft: "5vw"}}>
        <span style={{marginLeft: "-5vw"}} className='absolute text-3xl font-medium'>Form</span>
        <span className=' text-sm italic text-red-300'><br/> (All Fields are Required except for the file field) <br/> (Please enter valid data in the fields)</span>
          
          <StyledDiv>
          {formFields.map((field) => {
            switch (field.type) {
              case 'text':
              case 'number':
              case 'password':
              case 'file':
                return (
                  <StyledDiv key={field.id}>
                    <label className='title' htmlFor={field.id}>{field.name}</label>
                    <Field id={field.id} name={field.id} type={field.type} style={{
                    backgroundColor: 'lightgray',
                    padding: '0.5rem',
                    borderRadius: '0.25rem',
                    }} />
                    <ErrorMessage name={field.id} component="div" className="error" />
                  </StyledDiv>
                );
              case 'select':
                return (
                  <StyledDiv key={field.id}>
                    <label className='title' htmlFor={field.id}>{field.name}</label>
                    <Field className='options' id={field.id} name={field.id} as="select">
                      <option value="">Select an option</option>
                      {field.options && field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name={field.id} component="div" className="error" />
                  </StyledDiv>
                );
              case 'radio':
                return (
                  <StyledDiv key={field.id}>
                    <label className='title'>{field.name}</label>
                    <div className='flex'>
                    {field.options && field.options.map((option) => (
                      <label style={{marginRight: "1rem", cursor: "pointer"}} key={option.value}>
                        <Field id={field.id} name={field.id} type="radio" value={option.value} />
                        <span className='options'>{option.label}</span>
                      </label>
                    ))}
                    </div>
                    <ErrorMessage name={field.id} component="div" className="error" />
                  </StyledDiv>
                );
              case 'checkbox':
                return (
                  <StyledDiv key={field.id}>
                    <label className='title'>{field.name}</label>
                    <div className='flex'>
                    {field.options.map((option) => (
                      <label key={option.value}>
                        <Field id={field.id} name={field.id} type="checkbox" value={option.value} />
                        <span className='options'>{option.label}</span>
                      </label>
                    ))}
                    </div>
                    <ErrorMessage name={field.id} component="div" className="error" />
                  </StyledDiv>
                );
              default:
                return null;
            }
          })}
          </StyledDiv>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;