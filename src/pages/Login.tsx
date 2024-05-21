import { 
  IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar 
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


const Login: React.FC = () => {
  const params = useParams();
  const fields = useLoginFields();
  const [errors, setErrors] = useState<Array<{ id: string; message: string }>>([]);
  
  const history = useHistory(); // Gunakan useHistory untuk navigasi

  const goHome = () => {
    history.push('/home'); // Navigasi ke halaman login
  };

  const resetFields = () => {
    fields.forEach(field => field.input.state.reset());
    setErrors([]);
  };

  useEffect(() => {
    resetFields();
  }, [params]); // Menambahkan params sebagai dependensi

  const login = () => {
    const errors = validateForm(fields);
    setErrors(errors);

    if (!errors.length) {
      // Submit your form here
    }
  };

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
    </IonPage>
  );
};

export default Login;
