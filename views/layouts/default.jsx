let React = require('react')



function DefaultLayout(props){
    

    return(
    <html lang="en">
<head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="/css/style.css" />

</head>
<body>
    {props.children}
</body>
</html>
)
}




module.exports = DefaultLayout
