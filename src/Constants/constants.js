export const CASH_EXPIRE = 300000;
export const KM_FACTOR = 1000;
export const MSECONDS_FACTOR = 1000;
export const TIME_THRESHOLD = 12;
export const DATA = require('../Data/cities.json');
export const SAMPLELST = DATA.List; //get it as a list
// This code  will run when the component is first loaded
var cityCodeArry = []; //city Id containing array           
for (var i=0;i<SAMPLELST.length;i++){
     var cityCode = parseInt(SAMPLELST[i].CityCode); //get each city Id as a int
     cityCodeArry.push(cityCode);
 
}

export const CITYCODEARRY  = cityCodeArry;
export const MONTHS_YEAR = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
export const CARD_IMGS = [
    'card-color-1',
    'card-color-2',
    'card-color-3',
    'card-color-4',
    'card-color-5',
    'card-color-6',
    'card-color-7',
    'card-color-8',
];
//export allows to make constant values available for use in other JavaScript files (modules).