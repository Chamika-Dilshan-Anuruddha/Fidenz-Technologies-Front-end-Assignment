export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
export const IMG_URL = "https://openweathermap.org/img/wn/";
export const CASH_EXPIRE = 30000;
export const CASH_NAME_PREFIX = "weatherData_";

export const SINGLEPAGE_PATH = "/single/";
export const KM_FACTOR = 1000;
export const MSECONDS_FACTOR = 1000;
export const TIME_THRESHOLD = 12;
export const PRESSURE_UNIT = " hPa";
export const VISIBILITY_UNIT = " km";
export const WINDSPEED_UNIT = " m/s  ";
export const TEMPERATURE_UNIT = " °C";
export const HUMIDITY_UNIT = "%";
export const WINDSPEED_DIRECTION_UNIT = " Degree";
export const LAST_N_WORDS = 2;
export const DATA = require("../Data/cities.json");
export const CITYDATALIST = DATA.List; //get cityData as a list
export const MONTHS_YEAR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const CARD_IMGS = [
  "card-color-1",
  "card-color-2",
  "card-color-3",
  "card-color-4",
  "card-color-5",
  "card-color-6",
  "card-color-7",
  "card-color-8",
];
//export allows to make constant values available for use in other JavaScript files (modules).
