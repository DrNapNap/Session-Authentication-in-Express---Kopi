var React = require("react");

var DefaultLayout = require("../layouts/default");

function Login(props) {
  return (
    <DefaultLayout>
      <h1>register</h1>
      <form method="post" action="/register">
        <input type="name" name="name" require />

        <input type="email" name="email" placeholder="Email" require />
        <input type="password" name="password" placeholder="Password" require />
        <input type="submit" />
      </form>
      <a href="/login">login</a>
    </DefaultLayout>
  );
}

module.exports = Login;
