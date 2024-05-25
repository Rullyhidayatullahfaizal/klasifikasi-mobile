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
  IonText,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useRef, useState } from "react";
import axios from "axios";
import "./Klasifikasi.css";

const Klasifikasi: React.FC = () => {
  const [photo, setPhoto] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const modal = useRef<HTMLIonModalElement>(null);


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

  const uploadPhoto = async () => {
    if (!photo) {
      return;
    }

    try {
      // Get the token from localStorage or sessionStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      // Convert URI to Blob
      const response = await fetch(photo);
      const blob = await response.blob();

      // Create form data
      const formData = new FormData();
      formData.append("imageFile", blob, "photo.jpg");

      // Send form data to the endpoint
      const result = await axios.post("https://flip.backfliper.xyz/detects/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add the token here
        },
      });

      setPrediction(result.data);
      setShowPredictionModal(true); // Show the prediction modal
      console.log(result.data);
    } catch (error) {
      console.error("Error uploading photo", error);
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
          {photo && (
            <>
              <IonImg src={photo} />
              <IonButton onClick={uploadPhoto}>Upload Photo</IonButton>
            </>
          )}
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
        <IonModal
          isOpen={showPredictionModal}
          onDidDismiss={() => setShowPredictionModal(false)}
          id="prediksi-modal"
          ref={modal}
        >
          <IonContent className="ion-padding">
            <IonTitle>Prediction Result</IonTitle>
            {prediction && (
              <div>
                <IonText>
                  <h1 className="title">Deskripsi</h1>
                  <div className="hasil">
                  <p className="label-prediksi">Label: {prediction.content.prediction.label}</p>
                  <p className="value-prediksi">Value: {prediction.content.prediction.value}</p>
                  </div>
                </IonText>
                <hr />
                <IonTitle className="detail">Detail Prediction</IonTitle>
                <ul>
                  {prediction.content.detailPrediction.map(
                    (pred: any, index: number) => (
                      <li key={index}>
                        {pred.label}: {pred.value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            <IonButton onClick={() => setShowPredictionModal(false)} className="button-prediksi">
              Close
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Klasifikasi;
