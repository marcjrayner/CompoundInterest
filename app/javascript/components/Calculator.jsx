import React, {useState} from 'react'
import axios from 'axios'

const Calculator = () => {
  const [principal, setPrincipal] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [years, setYears] = useState(0)
  const [result, setResult] = useState(0)

  const getCalculationResult = () => {
    const data = {
      principal: 5,
      interest_rate: 5,
      years: 5
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
    <div>
      <h2>Compound interest Calculator</h2>
      <form>
        <input type="number" placeholder="principal"/>
        <input type="number" placeholder="interestrate"/>
        <input type="number" placeholder="years"/>
      </form>
      <button onClick={getCalculationResult}>Calculate</button>
      { result > 0 && 
        <><h2>Result:</h2><p>{result}</p></>
      }
    </div>
  )
}

export default Calculator
