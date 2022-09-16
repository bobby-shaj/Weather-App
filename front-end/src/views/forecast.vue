<template>
  <div class="container d-grid gap-2">
    <div
      id="searchBar"
      class="position-relative"
      style="background-color: #154c79; height: 100px"
    >
      <div
        class="form-floating position-absolute col"
        style="top: 25px; left: 500px; width: 400px"
      >
        <input
          type="city"
          class="form-control rounded-pill"
          id="cityOrZip"
          v-on:keyup.enter="getForcast"
          v-model="city"
          aria-describedby="nameHelp"
          placeholder="label"
          size="10"
        />
        <label for="cityOrZip" style="left: 5rem">
          Search City or Zip Code!
        </label>
      </div>
    </div>
    <div id="weatherSummary" class="position-relative" style="height: 300px">
      <div
        class="position-absolute"
        style="height: 100%; width: 100%; z-index: 0; left: 0px; top: 0px"
      >
        <img
          :src="forecast.coverpic"
          style="width: 100%; height: 100%; display: block"
        />
      </div>
      <div
        class="position-absolute d-inline ps-2 bg-dark text-white opacity-50"
        style="
          z-index: 2;
          left: 0px;
          height: 50px;
          width: 100%;
          text-align: left;
        "
      >
        <h3 class="d-inline">{{ forecast.city }}, {{ forecast.region }}</h3>
        <h5 class="d-inline ps-2">As of {{ forecast.time }}</h5>
      </div>
      <div
        class="position-absolute text-white ps-4"
        style="z-index: 2; top: 70px; text-align: left"
      >
        <div class="display-1">{{ forecast.feelslike }}°</div>
        <div class="fs-5">{{ forecast.condition }}</div>
        <div class="fs-4">
          Day {{ forecast.max_temp }}° | Night {{ forecast.min_temp }}°
        </div>
      </div>
      <div
        class="position-absolute"
        style="top: 75px; left: 1100px; height: 150px; width: 150px"
      >
        <img :src="forecast.condition_icon" style="height: 100%; width: 100%" />
      </div>
    </div>
    <div id="todaysForecast" class="border" style="height: 300px">
      <div class="pt-4 pb-3 ps-3">
        <p class="h4 text-start">
          Today's Forecast for {{ forecast.city }}, {{ forecast.region }}
        </p>
      </div>
      <div class="d-inline-block" style="width: 25%">
        <p class="h5 text-center">{{ forecast.forecast_morning.title }}</p>
        <p class="h5 text-center">{{ forecast.forecast_morning.temp }}°</p>
        <img
          :src="forecast.forecast_morning.icon"
          style="height: 20%; width: 20%"
        />
        <p class="h5 text-center">
          {{ forecast.forecast_morning.chance_of_rain }}%
        </p>
      </div>
      <div class="d-inline-block" style="width: 25%">
        <p class="h5 text-center">{{ forecast.forecast_afternoon.title }}</p>
        <p class="h5 text-center">{{ forecast.forecast_afternoon.temp }}°</p>
        <img
          :src="forecast.forecast_afternoon.icon"
          style="height: 20%; width: 20%"
        />
        <p class="h5 text-center">
          {{ forecast.forecast_afternoon.chance_of_rain }}%
        </p>
      </div>
      <div class="d-inline-block" style="width: 25%">
        <p class="h5 text-center">{{ forecast.forecast_evening.title }}</p>
        <p class="h5 text-center">{{ forecast.forecast_evening.temp }}°</p>
        <img
          :src="forecast.forecast_evening.icon"
          style="height: 20%; width: 20%"
        />
        <p class="h5 text-center">
          {{ forecast.forecast_evening.chance_of_rain }}%
        </p>
      </div>
      <div class="d-inline-block" style="width: 25%">
        <p class="h5 text-center">{{ forecast.forecast_overnight.title }}</p>
        <p class="h5 text-center">{{ forecast.forecast_overnight.temp }}°</p>
        <img
          :src="forecast.forecast_overnight.icon"
          style="height: 20%; width: 20%"
        />
        <p class="h5 text-center">
          {{ forecast.forecast_overnight.chance_of_rain }}%
        </p>
      </div>
    </div>
    <div id="weatherToday" class="border" style="height: 420px">
      <div class="text-start fs-3 fw-bold pt-4 ps-3">
        Weather Today in {{ forecast.city }}, {{ forecast.region }}
      </div>
      <div class="row ps-5 pe-5" style="width: 100%; height: 150px">
        <div class="col d-inline-block pt-3 ps-5">
          <div class="display-2 text-start ps-3">{{ forecast.feelslike }}°</div>
          <div class="fs-5 text-start ps-3">Feels Like</div>
        </div>
        <div class="col d-inline-block">
          <div class="text-end pt-2 pe-5" style="height: 50%">
            <img src="/images/sunrise_sunset.png" />
          </div>
          <div class="fs-5 text-end pt-2 pe-3" style="height: 50%">
            <div class="d-inline-block pe-3">{{ forecast.sunrise }}</div>
            <div class="d-inline-block">{{ forecast.sunset }}</div>
          </div>
        </div>
      </div>
      <div class="pt-4" style="height: 200px; width: 100%">
        <div class="d-inline-block" style="width: 50%; height: 100%">
          <div class="row align-items-center" style="height: 25%">
            <div class="col border-top pt-2 ps-5 ms-2">
              <p class="text-start">High/Low</p>
            </div>
            <div class="col border-top pt-2 pe-5 me-2">
              <p class="text-end">
                {{ Number(forecast.max_temp).toFixed(0) }}°/{{
                  Number(forecast.min_temp).toFixed(0)
                }}°
              </p>
            </div>
          </div>
          <div class="row align-items-center" style="height: 25%">
            <div class="col border-top pt-2 ps-5 ms-2">
              <p class="text-start">Humidity</p>
            </div>
            <div class="col border-top pt-2 pe-5 me-2">
              <p class="text-end">{{ forecast.humidity }}%</p>
            </div>
          </div>
          <div class="row align-items-center" style="height: 25%">
            <div class="col border-top pt-2 ps-5 ms-2">
              <p class="text-start">Pressure</p>
            </div>
            <div class="col border-top pt-2 pe-5 me-2">
              <p class="text-end">{{ forecast.pressure }} in</p>
            </div>
          </div>
          <div class="row align-items-center" style="height: 25%">
            <div class="col border-top pt-2 ps-5 ms-2">
              <p class="text-start">Visibility</p>
            </div>
            <div class="col border-top pt-2 pe-5 me-2">
              <p class="text-end">{{ forecast.visibility }} mi</p>
            </div>
          </div>
        </div>
        <div class="d-inline-block" style="width: 50%; height: 100%">
          <div class="row align-items-center" style="height: 25%">
            <div class="col border-top pt-2 ps-5 ms-2">
              <p class="text-start">Wind</p>
            </div>
            <div class="col border-top pt-2 pe-5 me-2">
              <p class="text-end">{{ Number(forecast.wind).toFixed(0) }} mph</p>
            </div>
          </div>
          <div class="row align-items-center" style="height: 25%">
            <div class="col border-top pt-2 ps-5 ms-2">
              <p class="text-start">Dew Point</p>
            </div>
            <div class="col border-top pt-2 pe-5 me-2">
              <p class="text-end">
                {{ Number(forecast.dewpoint).toFixed(0) }}°
              </p>
            </div>
          </div>
          <div class="row align-items-center" style="height: 25%">
            <div class="col border-top pt-2 ps-5 ms-2">
              <p class="text-start">UV Index</p>
            </div>
            <div class="col border-top pt-2 pe-5 me-2">
              <p class="text-end">{{ forecast.uv }} of 10</p>
            </div>
          </div>
          <div class="row align-items-center" style="height: 25%">
            <div class="col border-top pt-2 ps-5 ms-2">
              <p class="text-start">Moon Phase</p>
            </div>
            <div class="col border-top pt-2 pe-5 me-2">
              <p class="text-end">{{ forecast.moon_phase }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="hourlyForcast" class="border" style="height: 300px">
      <div class="pt-3">
        <p class="text-start ps-4 fs-4 fw-bold">Hourly Forecast</p>
      </div>
      <div class="row align-items-center ps-5 pe-5">
        <div class="col border-end">
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_0.title }}
          </div>
          <div class="text-center text-primary fw-bold fs-3">
            {{ Number(forecast.hourly_0.temp).toFixed(0) }}°
          </div>
          <div>
            <img
              :src="forecast.hourly_0.icon"
              style="height: 35%; width: 35%"
            />
          </div>
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_0.chance_of_rain }}%
          </div>
        </div>
        <div class="col border-end">
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_1.title }}
          </div>
          <div class="text-center text-primary fw-bold fs-3">
            {{ Number(forecast.hourly_1.temp).toFixed(0) }}°
          </div>
          <div>
            <img
              :src="forecast.hourly_1.icon"
              style="height: 35%; width: 35%"
            />
          </div>
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_1.chance_of_rain }}%
          </div>
        </div>
        <div class="col border-end">
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_2.title }}
          </div>
          <div class="text-center text-primary fw-bold fs-3">
            {{ Number(forecast.hourly_2.temp).toFixed(0) }}°
          </div>
          <div>
            <img
              :src="forecast.hourly_2.icon"
              style="height: 35%; width: 35%"
            />
          </div>
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_2.chance_of_rain }}%
          </div>
        </div>
        <div class="col border-end">
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_3.title }}
          </div>
          <div class="text-center text-primary fw-bold fs-3">
            {{ Number(forecast.hourly_3.temp).toFixed(0) }}°
          </div>
          <div>
            <img
              :src="forecast.hourly_3.icon"
              style="height: 35%; width: 35%"
            />
          </div>
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_3.chance_of_rain }}%
          </div>
        </div>
        <div class="col">
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_4.title }}
          </div>
          <div class="text-center text-primary fw-bold fs-3">
            {{ Number(forecast.hourly_4.temp).toFixed(0) }}°
          </div>
          <div>
            <img
              :src="forecast.hourly_4.icon"
              style="height: 35%; width: 35%"
            />
          </div>
          <div class="text-center fw-bold fs-5">
            {{ forecast.hourly_4.chance_of_rain }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "forecast",
  data() {
    return {
      forecast: {},
    };
  },
  methods: {
    async getForcast() {
      const result = await axios.get(`/forecast/${this.city}`);
      const forecast = result.data;
      this.forecast = forecast;
    },
    aPressed() {
      console.log("aPressed");
    },
  },
  async created() {
    const result = await axios.get(`/forecast/${this.$route.params.city}`);
    const forecast = result.data;
    this.forecast = forecast;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
