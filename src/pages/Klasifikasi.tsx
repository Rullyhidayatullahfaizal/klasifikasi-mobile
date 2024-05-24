import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonList,
  IonItem,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState } from "react";
import "./Klasifikasi.css";

const Klasifikasi: React.FC = () => {
  const [photo, setPhoto] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);

  const takePhoto = async (source: CameraSource) => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: source,
      });

      const imageUrl = image.webPath;
      setPhoto(imageUrl);
      setShowModal(false); // Close the modal after selecting an option
    } catch (error) {
      console.error("Error taking photo", error);
      setShowModal(false); // Close the modal even if there is an error
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Klasifikasi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding center-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Klasifikasi</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="center-button">
          <p className="text-one">
            Silahkan anda ambil foto rumah atau input gambar rumah
          </p>
          <IonButton onClick={() => setShowModal(true)}>Take Photo</IonButton>
          {photo && <IonImg src={photo} />}
        </div>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent>
            <IonList>
              <IonItem button onClick={() => takePhoto(CameraSource.Camera)}>
                Camera
              </IonItem>
              <IonItem button onClick={() => takePhoto(CameraSource.Photos)}>
                Gallery
              </IonItem>
              <IonItem button onClick={() => setShowModal(false)}>
                Cancel
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Klasifikasi;
