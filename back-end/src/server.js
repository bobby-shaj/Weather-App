import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import axios from 'axios';
import history from 'connect-history-api-fallback';

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist'), {maxAge: '1y', etag: false}));
app.use(history());

app.get('/forecast/:city', async (req, res) => {
    const {city} = req.params;
    let day = 0; 
    const result = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=8f3c3e27a58c48cb9fb190532221201&q=${city}&days=2&aqi=no&alerts=no`);
    const data = result.data;

    //console.log(req.socket.remoteAddress);

    const forecast = new Object(); 
    forecast.city = data.location.name;
    forecast.region = data.location.region;
    forecast.local_time = data.location.localtime; //has date and time

    //extract date, time, hour 
    let arr = (data.location.localtime).split(' '); 
    const date = arr[0];
    const time = arr[1];
    arr = time.split(':');
    let hour = Number(arr[0]); 

    forecast.date = date; 
    forecast.time = time; 
    forecast.max_temp = Number(data.forecast['forecastday'][day].day.maxtemp_f).toFixed(0);
    forecast.min_temp = Number(data.forecast['forecastday'][day].day.mintemp_f).toFixed(0);
    forecast.feelslike = Number(data.current.feelslike_f).toFixed(0);
    forecast.condition = data.current.condition.text;
    forecast.condition_icon = data.current.condition.icon;
    forecast.sunrise = data.forecast['forecastday'][day]['astro']['sunrise'];
    forecast.sunset = data.forecast['forecastday'][day]['astro']['sunset'];
    forecast.humidity = data.current.humidity;
    forecast.pressure = data.current.pressure_in;
    forecast.visibility = data.current.vis_miles; 
    forecast.wind = data.current.wind_mph;
    forecast.dewpoint = data.forecast['forecastday'][day]['hour'][hour].dewpoint_f;
    forecast.uv = data.forecast['forecastday'][day]['hour'][hour].uv; 
    forecast.moon_phase = data.forecast['forecastday'][day]['astro']['moon_phase'];

    // morning forecast
    const forecast_morning = new Object(); 
    forecast_morning.title = 'Morning';
    forecast_morning.temp = Number(data.forecast['forecastday'][day]['hour'][7].temp_f).toFixed(0); 
    forecast_morning.icon = data.forecast['forecastday'][day]['hour'][7].condition.icon;
    forecast_morning.chance_of_rain = data.forecast['forecastday'][day]['hour'][7].chance_of_rain;
    forecast.forecast_morning = forecast_morning;

    // Afternoon forecast
    const forecast_afternoon = new Object(); 
    forecast_afternoon.title = 'Afternoon';
    forecast_afternoon.temp = Number(data.forecast['forecastday'][day]['hour'][14].temp_f).toFixed(0);; 
    forecast_afternoon.icon = data.forecast['forecastday'][day]['hour'][14].condition.icon;
    forecast_afternoon.chance_of_rain = data.forecast['forecastday'][day]['hour'][14].chance_of_rain;
    forecast.forecast_afternoon = forecast_afternoon;

    // Evening forecast
    const forecast_evening = new Object(); 
    forecast_evening.title = 'Evening';
    forecast_evening.temp = Number(data.forecast['forecastday'][day]['hour'][19].temp_f).toFixed(0);; 
    forecast_evening.icon = data.forecast['forecastday'][day]['hour'][19].condition.icon;
    forecast_evening.chance_of_rain = data.forecast['forecastday'][day]['hour'][19].chance_of_rain;
    forecast.forecast_evening = forecast_evening;

    // Overnight forecast
    const forecast_overnight = new Object(); 
    forecast_overnight.title = 'Overnight';
    forecast_overnight.temp = Number(data.forecast['forecastday'][day]['hour'][23].temp_f).toFixed(0); 
    forecast_overnight.icon = data.forecast['forecastday'][day]['hour'][23].condition.icon;
    forecast_overnight.chance_of_rain = data.forecast['forecastday'][day]['hour'][23].chance_of_rain;
    forecast.forecast_overnight = forecast_overnight;

    //choose cover pic, based on weather condition, day/night
    let condition = forecast.condition.toLowerCase();
    let pic = '';
    if(data.current.is_day === 1){
        if(condition === 'sunny'){
            pic = '/images/clear_blue_sky.png';
        }else if(condition === 'partly cloudy'){
            pic = '/images/partly_cloudy_cover.png';
        }else if(condition === 'cloudy'){
            pic = '/images/cloudy_cover.png';
        }else if(condition === 'overcast'){
            pic = '/images/overcast.png';
        }else if(condition === 'mist'){
            pic = '/images/mist_cover.png'
        }else if(condition.includes('fog')){
            pic = '/images/foggy_cover.png'
        }else{
            if(condition.includes('rain') || condition.includes('drizzle')){
                pic = '/images/rain.png';
            }else if(condition.includes('snow') || condition.includes('blizzard')){
                pic = '/images/snowy_cover.png';
            }else{
                pic = '/images/day_general_cover.png';
            }
        }
    }else{
        if(condition === 'clear'){
            pic = '/images/clear_night_cover.png';
        }else if(condition === 'partly cloudy'){
            pic = '/images/partly_cloudy_night_cover.png';
        }else if(condition === 'cloudy' || condition === 'overcast'){
            pic = '/images/cloudy_night_cover.png';
        }else{
            if(condition.includes('rain') || condition.includes('drizzle')){
                pic = '/images/rainy_night_cover.png';
            }else{
                pic = '/images/night_general_cover.png';
            }
        }
    }

    forecast.coverpic = pic; 

    // Hourly Forecast
    // enter a loop to create 5 hourly objects
    let _hour = 0; 
    let hourly = '';
    let time_of_day = '';
    for(let i = 0; i < 5; i++){
        let obj = new Object(); 
        
        if(hour > 11 && hour < 24){
            time_of_day = 'pm'
        }else{
            time_of_day = 'am'
        }

        _hour = hour % 12;
        if(_hour === 0){
            _hour = 12; 
        } 

        if(hour > 23){
            hour = hour % 12; 
            day = day + 1;
        }

        if(i === 0){
            obj.title = 'Now';
        }else{
            obj.title = _hour + ' ' + time_of_day; 
        }
        obj.temp = data.forecast['forecastday'][day]['hour'][hour].temp_f;
        obj.icon = data.forecast['forecastday'][day]['hour'][hour].condition.icon;
        obj.chance_of_rain = data.forecast['forecastday'][day]['hour'][hour].chance_of_rain;

        hourly = 'hourly_' + i;
        forecast[hourly] = obj;

        hour = hour + 1;
    }

    res.status(200).json(forecast);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
    console.log("listening on port 8000...");
});

