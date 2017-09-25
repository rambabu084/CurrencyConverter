import React, { Component } from 'react';
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import CurrencyDropdown from '../components/CurrencyDropdown';
import CurrencyValue from '../components/CurrencyValue';
import CurrencyStore from '../stores/CurrencyStore';
import _ from 'lodash';

/*
This component is currency converter component which has access to state of the application
*/
@inject('CurrencyStore')
@observer
class CurrencyComponent extends Component {
  constructor(props)
  {
    super(props);
    this.selectedInputCurrency=this.selectedInputCurrency.bind(this);
    this.selectedOutputCurrency=this.selectedOutputCurrency.bind(this);
    this.inputCurrencyValueChanged=this.inputCurrencyValueChanged.bind(this);
    this.outputCurrencyValue=this.outputCurrencyValue.bind(this);
    this.showDisclaimer = this.showDisclaimer.bind(this);
  }

  // load the currency details from fixer API
  componentWillMount()
  {
      this.props.CurrencyStore.loadCurrencies();
  }

  // rendering the currency converter component
  render()
  {
    if(this.props.CurrencyStore.loading)
    {
      return (<div>Loading.....</div>);
    }
    return (<div>
             <div className="slds-float_left">
              <div className="slds-p-around_medium">
                <div className={this.props.CurrencyStore.allCurrencies instanceof TypeError?"error-message-show":"error-message-hide"}>
                  Please try after sometime
                </div>
                <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--medium">
                  <h3>Currency converter</h3>
                </div>
                <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--small slds-m-bottom--small slds-m-top--small">
                  Type in amount and select currency:
                </div>
                <div className="slds-grid slds-grid_vertical-align-start">
                  <CurrencyValue value={this.props.CurrencyStore.inputCurrencyValue} currencyValueChanged={this.inputCurrencyValueChanged}/>
                  <CurrencyDropdown CurrencyStore={this.props.CurrencyStore} initValue={this.props.CurrencyStore.inputCurrency} 
                    selectCurrency={this.selectedInputCurrency}/>
                </div>
                <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--small slds-m-bottom--small slds-m-top--small">
                  Converted amount:
                </div>
                <div className="slds-grid slds-grid_vertical-align-start">
                  <CurrencyValue disabledText="disabled" value={this.outputCurrencyValue()} />
                  <CurrencyDropdown  CurrencyStore={this.props.CurrencyStore} initValue={this.props.CurrencyStore.outputCurrency} 
                    selectCurrency={this.selectedOutputCurrency}/>
                </div>
                <div onClick={this.showDisclaimer}>
                  <a className="disclaimer-link slds-float--right" tabIndex="0" href="#"><u>Disclaimer</u></a>
                </div>
                <div ref="disclaimer" className="disclaimer-info">
                  The currency rates might not be based latest and are based on data from fixer api. Accuracy is not guaranteed for these rates.
                </div>
              </div>
             </div>
            </div>);

  }


  /*
    toggles between css classes for hiding and showing disclaimer
  */
  showDisclaimer(event)
  {
    this.props.CurrencyStore.showDisclaimer=!this.props.CurrencyStore.showDisclaimer;
    this.refs.disclaimer.className = this.props.CurrencyStore.showDisclaimer ? 'disclaimer-info disclaimer-visible':'disclaimer-info';
  }

  selectedInputCurrency(event)
  {
      this.props.CurrencyStore.inputCurrency = event.target.value;
  }

  selectedOutputCurrency(event)
  {
      this.props.CurrencyStore.outputCurrency = event.target.value;
  }

  /*
  This method performs below two tasks.
  Remove any special characters from input text field 
  Prepend with '0.' for decimal values entered with '.' as starting character
  */
  inputCurrencyValueChanged(event)
  {
      let textInputValue = event.target.value;
      // converting input string to array of characters
      const inputArray = Array.from(textInputValue);
      // using lodash forEach method to iterate character array
      _.forEach(inputArray, function(value)
                            {
                              //Add only 0 to 9 and . characters to final string
                              if(!value.match(/([0-9]|[.])/))
                              {
                                textInputValue = textInputValue.replace(value,'');
                              }
                            }
                );
      // Replace all . with |
      textInputValue = textInputValue.replace(/\./g, '|');
      // Replace first | with .
      textInputValue = textInputValue.replace(/\|/, '.');
      // Replace all | with ""
      textInputValue = textInputValue.replace(/\|/g,"");
      //prepend with 0 if final string text is .
      if("." == textInputValue)
      {
        textInputValue ="0.";
      }
      else if(textInputValue.indexOf('.')>0)
      {
        // restricting input to 2 decimal
        textInputValue = textInputValue.substr(0, textInputValue.indexOf(".") + 3);
      }
      this.props.CurrencyStore.inputCurrencyValue=textInputValue;
  }
  /*
  calculates the value of output text
  */
  outputCurrencyValue()
  {
    if(!this.props.CurrencyStore.inputCurrencyValue || !this.props.CurrencyStore.inputCurrency 
      || !this.props.CurrencyStore.outputCurrency || !this.props.CurrencyStore.allCurrencies)
    {
      return '';
    }
    const nominator = this.props.CurrencyStore.allCurrencies[this.props.CurrencyStore.outputCurrency];
    const denominator = this.props.CurrencyStore.allCurrencies[this.props.CurrencyStore.inputCurrency];
    const multiplier = (nominator/denominator);
    const result = this.props.CurrencyStore.inputCurrencyValue * multiplier;
    // round the value to 2 digit precision
    return _.round(result, 2);
  }
}
export default CurrencyComponent;