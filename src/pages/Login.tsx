import { 
  IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToast, IonToolbar 
} from '@ionic/react';
import { arrowBack, shapesOutline } from 'ionicons/icons';
import CustomField from '../components/CustomField';
import { useLoginFields } from '../data/fields';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';
import { useEffect, useState } from 'react';
import { validateForm } from '../data/utils';
import { useHistory, useParams } from 'react-router';
import styles from './Login.module.scss';
import axios from 'axios';


const Login: React.FC = () => {
  const params = useParams();
  const fields = useLoginFields();
  const [errors, setErrors] = useState<Array<{ id: string; message: string }>>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory(); // Gunakan useHistory untuk navigasi

  const goHome = () => {
    history.push('/home'); // Navigasi ke halaman login
  };

  
  const login = async () => {
    const validationErrors = validateForm(fields);
    setErrors(validationErrors);

    if (!validationErrors.length) {
      const payload = {
        email: fields.find(field => field.id === 'email')?.input.state.value || '',
        password: fields.find(field => field.id === 'password')?.input.state.value || '',
      };

      try {
        const response = await axios.post('https://flip.backfliper.xyz/users/login', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.data;

        if (data.status === 'success') {
          // Save the token to localStorage or state management
          localStorage.setItem('token', data.content.token);
          // Redirect to home or another page
          history.push('/klasifikasi');
        } else {
          setToastMessage(data.message || 'Login failed.');
          setShowToast(true);
        }
      } catch (error) {
        setToastMessage('An error occurred. Please try again.');
        setShowToast(true);
      }
    } else {
      setToastMessage('Please fill in all fields.');
      setShowToast(true);
    }
  };

  useEffect(() => {
    fields.forEach(field => field.input.state.setValue(''));
    setErrors([]);
  }, []);

  return (
    <IonPage className={styles.loginPage}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" className="custom-back" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton className="custom-button" onClick={goHome}>
              <IonIcon icon={shapesOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Log in</IonCardTitle>
              <h5>Welcome back, hope you're doing well</h5>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              {fields.map(field => (
                <CustomField key={field.id} field={field} errors={errors} />
              ))}
              <IonButton className="custom-button" expand="block" onClick={login}>Login</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Action message="Don't have an account?" text="Sign up" link="/daftar" />
          <Wave />
        </IonGrid>
      </IonFooter>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
      />
    </IonPage>
  );
};

export default Login;
