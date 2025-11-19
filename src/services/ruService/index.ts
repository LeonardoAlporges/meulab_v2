import apiInstance from "@services/apiInstance";
import { routes } from "@utils/routesApi";
import { RuMenuResponse } from "./type";

const getRuMenu = async (dateISO: string) => {
  return await apiInstance.get<RuMenuResponse>(routes.ru.getRuMenu(dateISO));
};

export const ruService = {
  getRuMenu,
};
