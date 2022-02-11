'use strict';

const axios = require("axios");

module.exports.run = async (event) => {
  try{
    const authKey = 'ko4tkorgTOK%YWEF_T%KH!hjkro%&ÅES#rgklowreGKERO3h';
    await axios.post(`${process.env.API_URL}/booking/auto-create-bookings-from-frame-bookings`,{}, {headers: { "Authorization":authKey}} );
    console.log("DEVELOPMENT - Successfully populated bookings")
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'ok',
        },
        null,
        2
      ),
    }
  }
  catch(e){
    console.log("DEVELOPMENT - Populate bookings error",e);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'error',
        },
        null,
        2
      ),
    }
  };

};
