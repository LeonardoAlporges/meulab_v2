import Reactotron from "reactotron-react-native";

Reactotron.configure({
  host: "192.168.1.9", // substitua pelo seu IP local
  port: 9090, // porta padrão; altere só se tiver customizado no app desktop
})
  .useReactNative()
  .connect();
