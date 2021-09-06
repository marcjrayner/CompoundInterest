// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Calculator from '../components/Calculator'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('user_data')
  const userData = JSON.parse(node.getAttribute('data'))
  const userSignedIn = node.getAttribute('is_signed_in')

  // center the div 
  let div = document.createElement('div');
  div.classList.add('container');
  div.classList.add('align-items-center');
  
  ReactDOM.render(
      <Calculator userSignedIn={userSignedIn} userData={userData}/>,
    document.body.appendChild(div),
  )
})
