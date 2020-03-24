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
            "/getCountryData?country='Country Name'"
        ]
    };
    res.status(200).send(options);
});
const getAggregatedDataHandler = require("./api/getAggregatedData");
app.get("/getAggregatedData", getAggregatedDataHandler.getAllData);
app.get("/getCountryData",getAggregatedDataHandler.getCountryData);
// // Now we create a async/await
// (async () => {

//     // Now we await it.
//     let all = await covid.getAll();

//     // Make sure you return it, this usually implies if you are using this inside a function.
//     // Use \n to break lines.
//     return console.log(`Cases: ${all.cases}\nDeaths: ${all.deaths}\nRecovered: ${all.recovered}`)
// })();
// (async () => {
//     // Specific Country
//     let specificCountry = await covid.getCountry({country: 'India'});
//     console.log(specificCountry);
//     // Specific State
//     return null;
//  })();