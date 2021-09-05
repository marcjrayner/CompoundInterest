import React, {useState} from 'react'
import { useInput } from './hooks/InputHook'
import axios from 'axios'

const Calculator = () => {
  const [result, setResult] = useState(0)
  const [currency, setCurrency] = useState("GBP")

  const { value:principal, bind:bindPrincipal, reset:resetPrincipal } = useInput(0);
  const { value:interestRate, bind:bindInterestRate, reset:resetInterestRate } = useInput(0);
  const { value:years, bind:bindYears, reset:resetYears } = useInput(0);  

  const getCalculationResult = () => {
    const data = {
      currency: currency,
      principal: principal,
      interest_rate: interestRate,
      years: years
      }
    axios.post('calculate_result', data)
    .then(response => {
      setResult(response.data.result);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div className="bg-light p-5 rounded-lg m-3">
      <h2>Compound interest Calculator</h2>
      <form>
        <div className="col-4" onChange={(e) => setCurrency(e.target.value)}>
          <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" value="GBP" />
          <label className="btn btn-secondary" htmlFor="option1">£</label>

          <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" value="USD"/>
          <label className="btn btn-secondary" htmlFor="option2">$</label>

          <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" value="EUR"/>
          <label className="btn btn-secondary" htmlFor="option3">€</label>
        </div>
        <br/>

        <div className="col-2">
          <label className="">Principal (starting value):</label>
          <input className="form-control" type="number" placeholder="Principal" { ...bindPrincipal } />
        </div>
        <br/>
        <div className="col-2">
          <label className="">Interest Rate (%):</label>
          <input className="form-control" type="number" placeholder="Interest rate" { ...bindInterestRate } />
        </div>
        <br/>
        <div className="col-2">
          <label className="">Number of Years:</label>
          <input className="form-control"type="number" placeholder="Years" { ...bindYears } />
        </div>
        <br/>
        
      </form>
      <button className="btn btn-primary" onClick={getCalculationResult}>Calculate</button>
      { result > 0 && 
        <><h2>Result:</h2><p>{result}</p></>
      }
    </div>
  )
}

export default Calculator
