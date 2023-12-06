import { MSECONDS_FACTOR, TIME_THRESHOLD, MONTHS_YEAR, LAST_N_WORDS } from "../Constants/constants";

export const unixToNormalTime = (unixTime) => {
  //This function takes unix date and returns a human readable time
  var myTime = new Date(unixTime * MSECONDS_FACTOR);
  var hours = myTime.getHours();
  var minutes = myTime.getMinutes();
  var amPm = hours >= TIME_THRESHOLD ? "pm" : "am";
  var newHours = hours % TIME_THRESHOLD || TIME_THRESHOLD; // Convert 0 to 12
  var newTime = newHours + "." + minutes + amPm;

  return newTime;
};

export const unixToNormalWithDate = (unixTime) => {
  //This function takes unix date and returns a human readable date and time
  var newTime = unixToNormalTime(unixTime);
  var myTime = new Date(unixTime * MSECONDS_FACTOR);
  var day = myTime.getDate();
  var monthName = MONTHS_YEAR[myTime.getMonth()];
  var newDt = newTime + ", " + monthName + " " + day;

  return newDt;
};

export const lastTwoWords = (weatherDesc) => {
  // this function returns only LAST_N_WORDS from the description
  var splitDescription = weatherDesc.split(" ");
  var lengthVec = splitDescription.length;
  if (lengthVec > LAST_N_WORDS) {
    var towWordsArr = splitDescription.slice(lengthVec - LAST_N_WORDS);
    weatherDesc = towWordsArr.join(" ");
  }

  return weatherDesc;
};