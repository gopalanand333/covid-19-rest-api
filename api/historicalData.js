const fetch = require('node-fetch');

function getHistoricalData(countryName) {

    return new Promise((resolve, reject) => {
        fetch(`https://corona.lmao.ninja/v2/historical/${countryName}`)
            .then(r => {
                resolve(r.json())
            }).catch(error=>reject(error));
    });
}
const historicalData = (req, res) => {
    const country = req.query.country;
     getHistoricalData(country).then(data=>{
         console.log(data);
         res.status(200).send(data)}).catch(e=>{
             console.log(e);
             res.status(200).send(e)});

}
module.exports = {
    getHostoricalData: historicalData
};