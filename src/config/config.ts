import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import moment from "moment";
import "moment/locale/pt-br";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Environment variables imported via babel-plugin-inline-dotenv
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.FIREBASE_APP_ID || "",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

moment.updateLocale("pt-br", {
  months:
    "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
      "_"
    ),
  weekdays: "Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sabado".split("_"),
});

export { firebase, moment };
