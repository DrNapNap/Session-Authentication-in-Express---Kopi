var React = require('react')

var DefaultLayout = require('../layouts/default')


function Home(props){

    return(
<DefaultLayout >
          <h1>Home</h1>
    <a href='/'>Main</a>
    <ul>
    <li>Name: {props.user.name}</li>
    <li>Email:  {props.user.email}</li>
    </ul>
    </DefaultLayout>
)
}




module.exports = Home;
