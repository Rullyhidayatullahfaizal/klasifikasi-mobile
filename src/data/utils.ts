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
  
  export const validateForm = (fields: Field[]): Error[] => {
    const errors: Error[] = [];
    fields.forEach(field => {
      if (!field.input.state.value) {
        errors.push({ id: field.id, message: `${field.label} is required` });
      }
    });
    return errors;
  };
  