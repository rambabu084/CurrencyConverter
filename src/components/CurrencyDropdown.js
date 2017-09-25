import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
/*
Component for currency drop down
*/
@inject('CurrencyStore')
@observer
export default class CurrencyDropDown extends Component
{
  constructor(props)
  {
    super(props);
  }
  renderCurrencies(currency)
  {
    return (<option key={currency} value={currency}>{currency}</option>);
  }

  //rendering the currency drop down component
  render()
  {
    if(!this.props.CurrencyStore.currencies)
    {
      return (<div></div>);
    }
    let currencyList = this.props.CurrencyStore.currencies;

    return (<div className="slds-form-element slds-m-left--medium">
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select className="slds-select slds-theme--shade currency-dropdown-width" value={this.props.initValue} 
                  onChange={this.props.selectCurrency} id="select-01">{currencyList.map(this.renderCurrencies)}</select>
                </div>
              </div>
            </div>);
  }
}
