const covid = require("novelcovid");
const fetch = require('node-fetch');
/**
 * 
 * @param {Object} request 
 * @param {JSON} response 
 * this service will give you a list 
 */
const data = (request, response) => {
    getData().then(data => {
        response.status(200).send(JSON.stringify(data));
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
    console.log(country);
    if (!country) {
        response.status(200).send("Please add country name as query parameter");
    } else {
        getCountryData(country).then(data => {
            response.status(200).send(data); 
        }).catch(error=>{
            console.log(error);
            response.status(500).send("Error Occured")});
    }

};
async function getCountryData(country) {
    return new Promise((resolve, reject) => {
        fetch(`https://corona.lmao.ninja/countries/${country}`)
            .then(r => {
                resolve(r.json())
            }).catch(error=>reject(error));
    });
}
const allCountryData = (request,response)=>{
getAllCountryData().then(data=>{
    response.status(200).send(data);
}).catch(e=>{
    response.status(500).send(e);
})
};
async function getAllCountryData(country) {
    const data = await covid.getCountry();
    return data;
};

module.exports = {
    getAllData: data,
    getCountryData: countryData,
    allCountryData: allCountryData
};