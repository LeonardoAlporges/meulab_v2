import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import DrawerContent from "@components/DrawerContent";
import ChangeCoordinator from "@screens/Coordinator/ChangeCoordinator";
import MonitorList from "@screens/Coordinator/Monitor/MonitorList";
import MonitorSchedules from "@screens/Coordinator/Monitor/MonitorSchedules";
import CurriculumSI from "@screens/Core/Curriculum/InformationSystems";
import DeveloperContact from "@screens/Core/DeveloperContact";
import Home from "@screens/Core/Home";
import Contact from "@screens/Core/Laboratories/Contact";
import Infrastructure from "@screens/Core/Laboratories/Infrastructure";
import LabFiveUsage from "@screens/Core/Laboratories/LabFiveUsage";
import UsageRegulation from "@screens/Core/Laboratories/UsageRegulation";
import LessonSchedule from "@screens/Core/LessonSchedule";
import MapUfes from "@screens/Core/Map/UfesMap";
import MonitorApplication from "@screens/Core/MonitorApplication";
import MonitorSchedulesLab from "@screens/Core/MonitorSchedulesLab";
import Notifications from "@screens/Core/Notification/Notifications";
import RegisterNotification from "@screens/Core/Notification/RegisterNotification";
import OccurrenceDetails from "@screens/Core/Occurrence/OccurrenceDetails";
import OccurrenceForm from "@screens/Core/Occurrence/OccurrenceForm";
import OccurrenceRequests from "@screens/Core/Occurrence/OccurrenceRequests";
import RoomReservationDetails from "@screens/Core/Reservation/ReservationDetails";
import RoomReservationForm from "@screens/Core/Reservation/ReservationForm";
import RoomReservationList from "@screens/Core/Reservation/ReservationRequests";
import RoomReservationTerms from "@screens/Core/Reservation/ReservationTerms";
import SiteCasi from "@screens/Core/SiteCasi";
import RequestSupport from "@screens/Core/Support/RequestSupport";
import SupportDetails from "@screens/Core/Support/SupportDetails";
import SupportForm from "@screens/Core/Support/SupportForm";
import SupportRequests from "@screens/Core/Support/SupportRequests";
import { DrawerParamList, RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator(): React.JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Menu"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 300,
        },
      }}
    >
      <Drawer.Screen name="Menu" component={Home} />
    </Drawer.Navigator>
  );
}

export default function Routes(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="MonitorList" component={MonitorList} />
      <Stack.Screen name="MonitorSchedules" component={MonitorSchedules} />
      <Stack.Screen
        name="MonitorSchedulesLab"
        component={MonitorSchedulesLab}
      />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Infrastructure" component={Infrastructure} />
      <Stack.Screen name="UsageRegulation" component={UsageRegulation} />
      <Stack.Screen name="LabFiveUsage" component={LabFiveUsage} />
      <Stack.Screen name="SolicitarSuporte" component={RequestSupport} />
      <Stack.Screen name="SupportForm" component={SupportForm} />
      <Stack.Screen name="SupportRequests" component={SupportRequests} />
      <Stack.Screen name="SupportDetails" component={SupportDetails} />
      <Stack.Screen
        name="RoomReservationTerms"
        component={RoomReservationTerms}
      />
      <Stack.Screen
        name="RoomReservationForm"
        component={RoomReservationForm}
      />
      <Stack.Screen
        name="RoomReservationList"
        component={RoomReservationList}
      />
      <Stack.Screen
        name="RoomReservationDetails"
        component={RoomReservationDetails}
      />
      <Stack.Screen
        name="RegistraNotificacao"
        component={RegisterNotification}
      />
      <Stack.Screen name="Notificacoes" component={Notifications} />
      <Stack.Screen name="SejaMonitor" component={MonitorApplication} />
      <Stack.Screen name="AlterarCoordenador" component={ChangeCoordinator} />
      <Stack.Screen name="CurriculumSI" component={CurriculumSI} />
      <Stack.Screen name="ContatoDesenvolvedor" component={DeveloperContact} />
      <Stack.Screen name="MapUfes" component={MapUfes} />
      <Stack.Screen name="LessonSchedule" component={LessonSchedule} />
      <Stack.Screen name="SiteCasi" component={SiteCasi} />
      <Stack.Screen name="OccurrenceForm" component={OccurrenceForm} />
      <Stack.Screen name="OccurrenceRequests" component={OccurrenceRequests} />
      <Stack.Screen name="OccurrenceDetails" component={OccurrenceDetails} />
    </Stack.Navigator>
  );
}
