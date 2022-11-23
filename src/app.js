import "./../styles/styles.css";

import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  listAll,
  deleteObject,
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

      getDownloadURL(result.ref).then((url) => {
        const myImage = document.getElementById("myImage");
        myImage.src = url;
      });
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
  const myList = document.getElementById("myFileList");
  res.items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerText = item.fullPath;
    myList.appendChild(listItem);
  });
});

const imageRef2 = ref(storage, "Test2.png");

deleteObject(imageRef2).then(() => {
  console.log("Plik usunięto");
});

const storageRef2 = ref(storage);
listAll(storageRef2).then((res) => {
  res.items.forEach((item) => {
    const img = document.createElement("img");
    const div = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Usuń";
    deleteBtn.dataset.imageName = item.fullPath;

    // deleteBtn.addEventListener("click", (event) => {
    //   //funkcje rejestrujące event jako pierwszy argument zwracają objekt (event)
    //   const imageRef2 = ref(storage, event.target.dataset.imageName); //event... jest to nazwa usuwanego obrazka z obiektu event podanego jako parametr
    //   deleteObject(imageRef2).then(() => {
    //     loadImagesList();
    //     console.log("Plik usunięto!");
    //   });
    // });

    deleteBtn.addEventListener("click", () => {
      deleteObject(item).then(() => {
        loadImagesList();
      });
    });

    div.classList.add("card");
    img.classList.add("image");

    div.appendChild(img);
    div.appendChild(deleteBtn);
    document.body.appendChild(div);
    getDownloadURL(item).then((url) => {
      img.src = url;
    });
  });
});
