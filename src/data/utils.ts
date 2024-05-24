interface Field {
    id: string;
    label: string;
    input: {
      props: {
        type: string;
        placeholder: string;
      };
      state: {
        value: string;
        reset: () => void;
      };
    };
  }
  
  interface Error {
    id: string;
    message: string;
  }
  
  export const validateForm = (fields: any[]) => {
    const errors = [];
  
    fields.forEach(field => {
      if (!field.input.state.value) {
        errors.push({ id: field.id, message: `${field.label} is required` });
      }
    });
  
    const passwordField = fields.find(field => field.id === 'password');
    const passwordConfirmField = fields.find(field => field.id === 'passwordConfirm');
  
    if (passwordField && passwordConfirmField && passwordField.input.state.value !== passwordConfirmField.input.state.value) {
      errors.push({ id: 'passwordConfirm', message: 'Passwords do not match' });
    }
  
    return errors;
  };
  