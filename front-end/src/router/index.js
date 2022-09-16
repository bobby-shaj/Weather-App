import { createRouter, createWebHistory } from "vue-router";
import LocationPage from "../views/location.vue";
import ForecastPage from "../views/forecast.vue";

const routes = [
  {
    path: "/",
    name: "Location",
    component: LocationPage,
  },
  {
    path: "/forecast/:city",
    name: "Forecast",
    component: ForecastPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
