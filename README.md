# Watch your favorite stocks, real stocks!!!
This app is to track the real stocks via API from FMP (Financial Modeling Prep). 

## Features

- Basic JWT authentication.
- Search real stocks with API provided by FMP.
- Add/remove your favorite stocks into your portfolio and save to the local database.
- Save comments on your favorite stocks.

## Technologies

- .NET 8
- React
- SQL server with Entity Framework
- External API: Financial Modeling Prep

## `How to run locally`

- Install SQL server, and replace SQL server settings in "ConnectionStrings:DefaultConnection" (api/appsettings.json)
- Visit https://site.financialmodelingprep.com/ , and register API, then replace the API key at "FMPKey" (api/appsettings.json) and at "REACT_APP_API_KEY" (frontend/.env)
- cd ./api -> from command line run: dotnet watch run
- cd ./frontend -> from command line run: npm start

