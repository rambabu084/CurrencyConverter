# CurrencyConverter
Sample react + mobx application for currency conversion based on fixer API

### Basic functionality 

1) This application lets the user to select the source currency and target currency. 
2) User needs to enter the amount next to source currency to view the equivalent target currency.

### Behind the scenes

1) Consumes api.fixer.io API 
2) Populates the currency types and exchange rates based on the response returned from API
3) Considered only 3 types of currencies [CAD, USD, EUR]
4) Calculates the target value based on the conversion rate from api with EUR as base

### Technology stack 

Used reactjs, mobx, npm, webpack ...etc
Used scss for styling.
Please explore package.json and project to get the full understanding.  

### How to run

1) Download or clone the project
       command to clone
       'git clone https://github.com/programworks11/CurrencyConverter.git'     
2) Install - run 'npm install' command in root directory (same directory with package.json)
3) Run command 'npm start'
4) Open browser and give http://127.0.0.1:8080 
