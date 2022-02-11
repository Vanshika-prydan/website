'use strict';

const config = require('./config');
const axios = require('axios');

module.exports.execute = async (event) => {

  try{
    const result = await axios.post(`${config.API_URL}${config.PATH}`,{},{headers:{"Authorization": config.AUTH_KEY}});
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message:"success"
        },
        null,
        2
      ),
    };

  }
  catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: err,
        },
        null,
        2
      ),
    };
  }

 

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
