let React = require('react')

let DefaultLayout = require('./layouts/default')

function Index (props) {

    return (
        <DefaultLayout>
        <div>
        
    <h1>Welcome {props.velk}</h1>
    {
      props.userId ?
       <> 
 <a href='/home'>Home</a>
 <form method='post' action='/logout'>
<button>Logout</button>
</form>
</>
        :
        <ul>
<li><a href='/login'>login</a></li>
<li><a href='/register'>register</a></li>
    </ul>
}
</div>
</DefaultLayout>
    )
}

module.exports = Index;
