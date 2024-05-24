import { IonButton } from '@ionic/react';
import './ExploreContainer.css';
import { useHistory } from 'react-router';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const history = useHistory(); // Gunakan useHistory untuk navigasi

  const goToLogin = () => {
    history.push('/login'); // Navigasi ke halaman login
  };

  const goToDaftar = () => {
    history.push('/daftar'); // Navigasi ke halaman login
  };

  const goKlasifikasi = () => {
    history.push('/klasifikasi'); // Navigasi ke halaman login
  };
  return (
    <>
    <div id="container">
      <strong>Klasifikasi Object</strong>
      <p>You can determine the house category based on the image in this application <a target="_blank" rel="noopener noreferrer" href="#">application</a></p>
      <IonButton onClick={goToLogin}>Login</IonButton>
      <IonButton onClick={goToDaftar}>Daftar</IonButton>
      <IonButton className="predictive" style={{ maxWidth: '400px' }} onClick={goKlasifikasi}>
      Do Your Home Classification Now
      </IonButton>
    </div>
    </>
  );
};

export default ExploreContainer;
