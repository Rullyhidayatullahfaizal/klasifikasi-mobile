import { IonAlert, IonButton } from '@ionic/react';
import './ExploreContainer.css';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const history = useHistory(); // Gunakan useHistory untuk navigasi
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login
  const [showAlert, setShowAlert] = useState(false); // State untuk menampilkan alert

  useEffect(() => {
    // Cek token di localStorage saat komponen dirender
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const goToLogin = () => {
    history.push('/login'); // Navigasi ke halaman login
  };
  const goToDaftar = () => {
    history.push('/daftar'); // Navigasi ke halaman login
  };

  const goKlasifikasi = () => {
    if (isLoggedIn) {
      history.push('/klasifikasi'); // Navigasi ke halaman klasifikasi jika sudah login
    } else {
      setShowAlert(true); // Tampilkan alert jika belum login
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update login status
    history.push('/'); // Navigate to home page or another appropriate page
  };
  return (
    <>
    <div id="container">
      <strong>Klasifikasi Object</strong>
      <p>You can determine the house category based on the image in this application <a target="_blank" rel="noopener noreferrer" href="#">application</a></p>
       {!isLoggedIn && (
          <>
            <IonButton onClick={goToLogin}>Login</IonButton>
            <IonButton onClick={goToDaftar}>Daftar</IonButton>
            
          </>
        )}
        {isLoggedIn && (
          <IonButton className='logout' onClick={logout}>Logout</IonButton>
        )}
        <IonButton className="predictive" style={{ maxWidth: '400px' }} onClick={goKlasifikasi}>
      Do Your Home Classification Now
      </IonButton>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Peringatan'}
        message={'Anda harus login terlebih dahulu'}
        buttons={['OK']}
      />
    </div>
    </>
  );
};

export default ExploreContainer;
