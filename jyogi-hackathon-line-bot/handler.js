const serverless = require("serverless-http");
const app = require("./dist/app.js");

exports.handler = serverless(app);
