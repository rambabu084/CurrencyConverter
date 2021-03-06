import { computed, observable, action } from "mobx";
import axios from 'axios';
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

  @action loadCurrencies() {
    this.loading = true;
      axios.get(FIXER_API_BASE_URL)
        .then(response => {
          response.data.rates['EUR'] =1;
          this.allCurrencies = response.data.rates;
          this.loading = false;
        })
        .catch(() => {
          console.log("there was an error while fetching currency data from fixer API");
        });
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
