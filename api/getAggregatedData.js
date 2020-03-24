const covid = require("novelcovid");
/**
 * 
 * @param {Object} request 
 * @param {JSON} response 
 */
const data = (request, response) => {
    getData().then(data => {
        response.status(200).send(data);
    }).catch(error => {
        console.error(error);
        response.status(500).send(error);
    })
};
async function getData() {
    const allData = await covid.getAll();
    return { "cases": allData.cases, "deaths": allData.deaths, "recovered": allData.recovered, "lastUpdated": new Date(allData.updated) };
};

/**
 * 
 * @param {object} request 
 * @param {json} response 
 */
const countryData = (request, response) => {
    const country = request.query.country;
    if (!country) {
        response.status(200).send("Please add country name as query parameter");
    } else {
        getCountryData(country).then(data => {
            response.status(200).send(data);
        }).catch(error=>response.status(500).send("Error Occured"));
    }

};
async function getCountryData(country) {
    const data = await covid.getCountry({ country: country });
    console.log(data);
    return data;
};

module.exports = {
    getAllData: data,
    getCountryData: countryData
};