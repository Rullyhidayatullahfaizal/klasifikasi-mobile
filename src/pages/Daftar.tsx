import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
} from '@ionic/react';
import styles from './Daftar.module.scss';

import { arrowBack, shapesOutline } from 'ionicons/icons';
import CustomField from '../components/CustomField';
import { useSignupFields } from '../data/fields';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';
import { useEffect, useState } from 'react';
import { validateForm } from '../data/utils';
import { useHistory, useParams } from 'react-router';

const Signup: React.FC = () => {
  const params = useParams();
  const fields = useSignupFields();
  const [errors, setErrors] = useState<Array<{ id: string; message: string }>>([]);
  const history = useHistory()
  
  const createAccount = () => {
    const validationErrors = validateForm(fields);
    setErrors(validationErrors);

    if (!validationErrors.length) {
      // Submit your form here
    }
  };

  const goHome = () => {
    history.push('/home'); // Navigasi ke halaman login
  };

  useEffect(() => {
    fields.forEach(field => field.input.state.setValue(''));
    setErrors([]);
  }, [params]);

  return (
    <IonPage className={styles.signupPage}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" className="custom-back" />
          </IonButtons>

          <IonButtons slot="end" onClick={goHome}>
            <IonButton className="custom-button">
              <IonIcon icon={shapesOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Sign up</IonCardTitle>
              <h5>Let's get to know each other</h5>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              {fields.map(field => (
                <CustomField key={field.id} field={field} errors={errors} />
              ))}

              <IonButton className="custom-button" expand="block" onClick={createAccount}>
                Create account
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Action message="Already got an account?" text="Login" link="/login" />
          <Wave />
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Signup;
