import { runInAction, computed, observable, action } from "mobx";
import _ from 'lodash';

const FIXER_API_BASE_URL = "http://api.fixer.io/latest?base=EUR";

export default class CurrencyStore {

  @observable allCurrencies= [];
  @observable inputCurrency='CAD';
  @observable outputCurrency='USD';
  @observable inputCurrencyValue='';
  @observable outputCurrencyValue='';
  @observable showDisclaimer=false;
  @observable loading= false;

  @action async loadCurrencies() {
    this.loading = true;
    // fetch data from fixer api and get the currencies
    try {
      const response = await fetch(FIXER_API_BASE_URL);
      const fixerResponse = await response.json();
      runInAction(() => {
        fixerResponse.rates['EUR'] = 1;
        this.allCurrencies = fixerResponse.rates;
        this.loading = false;
      });
    } catch (e) {
      console.log('there was an error while fetching currency data from fixer API' + e);
    }
  }

  /*
    filters only the currencies required. As per the requirement,currencies should be CAD, USD, EUR.
  */
  @computed get currencies() {
    let currenciesArray = [];
    _.forEach(this.allCurrencies,function(value, key)
                                {
                                  if(key == 'USD' || key == 'CAD' || key=='EUR')
                                   {
                                      currenciesArray = [...currenciesArray, key]
                                   }
                              });
    return currenciesArray;
  }

}