# Covid-19 Realtime Consolidated data REST service
Rest API to Provide consolidated and real-time Covid-19 data from various government data sources

# Data is Refreshed in every 10 Mins
The API is scheduled to pull data from various data sources, add timestamp, weather information about the area in the data fetched, match with the exhisting in-memory database and update the tables.

## Tech used
- SQLITE
- someshit