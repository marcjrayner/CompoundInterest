import React, { useState, useEffect } from 'react'
import { useInput } from './hooks/InputHook'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Calculator = ({userSignedIn, userData}) => {
  const [result, setResult] = useState(0)
  const [currency, setCurrency] = useState("GBP")
  const [currencySymbol, setCurrencySymbol] = useState("£")

  const { value:principal, bind:bindPrincipal, reset:resetPrincipal } = useInput("");
  const { value:interestRate, bind:bindInterestRate, reset:resetInterestRate } = useInput("");
  const { value:years, bind:bindYears, reset:resetYears } = useInput("");  
  const { value:name, bind:bindName, reset:resetName } = useInput("");  

  useEffect(() => {
    if (currency === "GBP"){
      setCurrencySymbol("£")
    } else if (currency === "USD") {
      setCurrencySymbol("$")
    } else if (currency === "EUR") {
      setCurrencySymbol("€")
    }

    return () => {}
  }, [currency])

  const getCalculationResult = () => {
    const data = {
      currency: currency,
      principal: principal,
      interest_rate: interestRate,
      years: years
      }
    axios.post('get_compound_interest', data)
    .then(response => {
      setResult(response.data.result);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const saveCalculation = () => {
    const data = {
      currency: currency,
      principal: principal,
      interest_rate: interestRate,
      years: years,
      name: name,
      user_id: userData["id"]
      }
    axios.post('/calculations.json', data)
    .then(response => {
      // console.log(response);
      window.location.href = `/calculations/${response.data.id}`;
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div className="bg-light p-5 rounded-lg m-3 container text-center align-items-center">
      <h2>Compound interest Calculator</h2>
      <div className="row justify-content-center">
        <div style={{width: "25rem"}}>
          <div onChange={(e) => setCurrency(e.target.value)}>
            <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" value="GBP" />
            <label className="btn btn-secondary" htmlFor="option1">£</label>

            <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" value="USD"/>
            <label className="btn btn-secondary" htmlFor="option2">$</label>

            <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" value="EUR"/>
            <label className="btn btn-secondary" htmlFor="option3">€</label>
          </div>
          <br/>

          <div>
            <label>Principal (starting value):</label>
            <div className="input-group">
              <span className="input-group-text">{currencySymbol}</span>
              <input className="form-control" type="number" placeholder="Principal" { ...bindPrincipal } />
            </div>
          </div>
          <br/>
          <div>
            <label>Interest Rate (%):</label>
            <input className="form-control" type="number" placeholder="Interest rate" { ...bindInterestRate } />
          </div>
          <br/>
          <div>
            <label>Number of Years:</label>
            <input className="form-control" type="number" placeholder="Years" { ...bindYears } />
          </div>
          <br/>
          <button className="btn btn-primary" onClick={getCalculationResult}>Calculate</button>

          {result > 0 && 
          <>
            <br/>
            <p>{`After ${years} years, with an interest rate of ${interestRate}%, your ${currencySymbol}${principal}`} will grow to:</p>
            <h2>{currencySymbol}{result}</h2>
          </>
          }

          {userSignedIn === "false" && 
          <>
            <br/>
            <p> Sign up to save calculations!</p>   
          </>
          }

          {userSignedIn === "true" && 
          <>
            <br/>
            <label>Enter a name to save:</label>
            <input className="form-control" type="text" placeholder="eg. bank name" { ...bindName } />
            <button className="btn btn-secondary" onClick={saveCalculation} disabled={name.length > 0 ? false : true}>Save Calculation</button>
          </>
          }
          
      </div>
      </div>
    </div>
  )
}

export default Calculator
