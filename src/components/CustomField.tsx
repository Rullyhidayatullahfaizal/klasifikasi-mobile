import React from 'react';
import { IonInput, IonLabel,  } from '@ionic/react';
import styles from './CustomField.module.scss';

interface CustomFieldProps {
  field: {
    id: string;
    label: string;
    input: {
      props: {
        type: any;
        placeholder: string;
      };
      state: {
        value: string;
        setValue: (value: string) => void;
      };
    };
  };
  errors: Array<{ id: string; message: string }>;
}

const CustomField: React.FC<CustomFieldProps> = ({ field, errors }) => {
  const error = errors.find(e => e.id === field.id);
  const errorMessage = error && error.message;

  return (
    <div className={styles.field}>
      <IonLabel className={styles.fieldLabel}>
        {field.label}
        {error && <p className="animate__animated animate__bounceIn">{errorMessage}</p>}
      </IonLabel>
      <IonInput
        className={styles.customInput}
        value={field.input.state.value}
        onIonChange={(e) => field.input.state.setValue(e.detail.value!)}
        {...field.input.props}
      />
    </div>
  );
};

export default CustomField;
