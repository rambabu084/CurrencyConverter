import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import CurrencyComponent from '../components/CurrencyComponent';
import CurrencyStore from '../stores/CurrencyStore';
import './../style.scss';

/*
 wrapper component
*/
export default class App extends Component
{
  render()
  {
    return (<div>
              <div className="currency-container">
              <Provider CurrencyStore={new CurrencyStore()}><CurrencyComponent /></Provider>
              </div>
              <div className="currency-container">
              <Provider CurrencyStore={new CurrencyStore()}><CurrencyComponent /></Provider>
              </div>
              <div className="currency-container">
              <Provider CurrencyStore={new CurrencyStore()}><CurrencyComponent /></Provider>
              </div>
            </div>);
  }
}
