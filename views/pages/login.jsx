



var React = require('react')

var DefaultLayout = require('../layouts/default')


function Login(props){

    return(

        <DefaultLayout>
<h1>Login</h1>
  <form method='post' action='/login'>
  <input type='email' name='email' placeholder='Email' require/>
  <input type='password' name='password' placeholder='Password' require/>
  <input type='submit'/>

  </form>
  <a href='/register'>register</a>
  </DefaultLayout>
)
}




module.exports = Login;
