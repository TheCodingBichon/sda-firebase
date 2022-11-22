import "./../styles/styles.css";

import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  listAll,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBP3Uc77d01Gh4vRNmU9IQcVfxNoEoFN8M",
  authDomain: "sda-firebase-1978e.firebaseapp.com",
  projectId: "sda-firebase-1978e",
  storageBucket: "sda-firebase-1978e.appspot.com",
  messagingSenderId: "168666483368",
  appId: "1:168666483368:web:3b7c1a2b41e8f1daf8d09d",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const myBtn = document.getElementById("mySendBtn");
myBtn.addEventListener("click", () => {
  const myResult = document.getElementById("myResult");
  const file = document.getElementById("myFileInput").files[0];
  if (file) {
    myResult.innerText = "Przesyłam...";
    const myFileNameInput = document.getElementById("myFileNameInput");
    const myFileRef = ref(storage, myFileNameInput.value);
    uploadBytes(myFileRef, file).then((result) => {
      myResult.innerText = "Przesłano!";
    });
  } else {
    myResult.innerText = "Error: Wybierz plik!";
  }
});

const imageRef = ref(storage, "zdjecieCV.png");
getDownloadURL(imageRef).then((url) => {
  const myImage = document.getElementById("myImage");
  myImage.src = url;
});

const storageRef = ref(storage);
listAll(storageRef).then((res) => {
  const myList = document.getElementById("myFilesList");
  res.items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerText = item.fullPath;
    myList.appendChild(listItem);
  });
});
