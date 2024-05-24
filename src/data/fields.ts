import { useState } from 'react';

export const useLoginFields = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const resetEmail = () => setEmail('');
  const resetPassword = () => setPassword('');

  return [
    {
      id: 'email',
      label: 'Email',
      input: {
        props: {
          type: 'email' as 'email', // Explicitly cast to TextFieldTypes
          placeholder: 'Enter your email'
        },
        state: {
          value: email,
          setValue: setEmail,
          reset: resetEmail // Add reset function
        }
      }
    },
    {
      id: 'password',
      label: 'Password',
      input: {
        props: {
          type: 'password' as 'password', // Explicitly cast to TextFieldTypes
          placeholder: 'Enter your password'
        },
        state: {
          value: password,
          setValue: setPassword,
          reset: resetPassword // Add reset function
        }
      }
    }
  ];
};


export const useSignupFields = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return [
    {
      id: 'name',
      label: 'Name',
      input: {
        props: {
          type: 'text' as 'text',
          placeholder: 'Enter your name',
        },
        state: {
          value: name,
          setValue: setName,
        },
      },
    },
    {
      id: 'email',
      label: 'Email',
      input: {
        props: {
          type: 'email' as 'email',
          placeholder: 'Enter your email',
        },
        state: {
          value: email,
          setValue: setEmail,
        },
      },
    },
    {
      id: 'password',
      label: 'Password',
      input: {
        props: {
          type: 'password' as 'password',
          placeholder: 'Enter your password',
        },
        state: {
          value: password,
          setValue: setPassword,
        },
      },
    },
    {
      id: 'passwordConfirm',
      label: 'Confirm Password',
      input: {
        props: {
          type: 'password' as 'password',
          placeholder: 'Confirm your password',
        },
        state: {
          value: passwordConfirm,
          setValue: setPasswordConfirm,
        },
      },
    },
  ];
};
  