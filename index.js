// Declare the package
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const expressSanitizer = require("express-sanitizer");
const app = express();
app.use(expressSanitizer());
app.use(helmet());
app.use(cors());
app.disable("x-powered-by");
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.info(`APP is running at port ${port}`);
})
app.get("/",(req,res)=>{
    const options = {
        "Available Operations": [
            "/getAggregatedData",
            "/allCountryData",
            "/getCountryData?country='Country Name'",
            "/historicalData?country=CountryName"
        ]
    };
    res.status(200).send(options);
});
const getAggregatedDataHandler = require("./api/getAggregatedData");
const historicalData = require("./api/historicalData");
app.get("/getAggregatedData", getAggregatedDataHandler.getAllData);
app.get("/getCountryData",getAggregatedDataHandler.getCountryData);
app.get("/allCountryData",getAggregatedDataHandler.allCountryData);
app.get("/historicalData", historicalData.getHostoricalData);