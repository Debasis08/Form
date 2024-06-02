# React Form Component

This is a React component that provides a dynamic form builder with various input field types such as text, number, password, file, select, radio, and checkbox. Putting regex validation for the email and password to make sure of the correct format from the user. The component is built using the following libraries and frameworks:

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Formik**: A popular open-source library for building forms in React applications. It provides a simple and scalable way to handle form state management, validation, and submission.
- **Styled Components**: A CSS-in-JS library that allows you to write actual CSS code to style React components.

## Form Configuration

The form fields and their properties are defined in a separate JSON file (`form.json`). This file contains an array of field objects, where each object represents a form field with the following properties:

- *id*: A unique identifier for the field.
- *name*: The label or name of the field.
- *type*: The type of the field (e.g., text, number, password, file, select, radio, checkbox).
- *required* (optional): A boolean value indicating whether the field is required or not.
- *regex* (optional): A regular expression pattern for validating the field value.
- *options* (for select, radio, and checkbox fields): An array of option objects with value and label properties.
