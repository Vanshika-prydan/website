'use strict';
const config = require("./config");
const axios = require("axios");

module.exports.execute = async (event) => {

  await axios.post(`${config.API_URL}${config.PATH}`,{},{headers:{"Authorization":config.AUTH_KEY}});
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
};
