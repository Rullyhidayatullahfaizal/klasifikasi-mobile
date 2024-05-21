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
          type: 'email' as string, // Explicitly cast to TextFieldTypes
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
          type: 'password' as string, // Explicitly cast to TextFieldTypes
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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

  
    const resetUsername = () => setUsername('');
    const resetEmail = () => setEmail('');
    const resetPassword = () => setPassword('');
  
    return [
      {
        id: 'username',
        label: 'Username',
        input: {
          props: {
            type: 'text' as 'text',
            placeholder: 'Enter your username',
          },
          state: {
            value: username,
            setValue: setUsername,
            reset: resetUsername,
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
            reset: resetEmail,
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
            reset: resetPassword,
          },
        },
      },
      {
        id: 'confirmPassword',
        label: 'confirmPassword',
        input: {
          props: {
            type: 'password' as 'password',
            placeholder: 'Enter your password',
          },
          state: {
            value: confirmPassword,
            setValue: setconfirmPassword,
            reset: resetPassword,
          },
        },
      },
    ];
  };
  