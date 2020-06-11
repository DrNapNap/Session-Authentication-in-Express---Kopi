const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const TWO_HOURS = 1000 * 60 * 60 * 2;

var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};
// https://github.com/reactjs/express-react-views



const {
  PORT = 3000,
  NODE_ENV = "development",

  SESS_NAVE = "sid",
  SESS_SECRET = "ssh!quiet,it'asecret!",
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === "Production";

const users = [
  { id: 1, name: "addwa", email: "teswqomq@gmail.com", password: "dwww" },
  { id: 2, name: "addwda", email: "teswqodmq@gmail.com", password: "dwdww" },
  { id: 3, name: "addwad", email: "teswqomqd@gmail.com", password: "dwww" },
];

const app = express();

app.set('trust proxy', 1);

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static('public'))


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    name: SESS_NAVE,
    store: new FileStore(fileStoreOptions),
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/home");
  } else {
    next();
  }
};

app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals.user = users.find((user) => user.id === userId);
  }
  next();
});

app.get("/", (req, res) => {
  const { userId } = req.session;
  console.log(userId);

  res.render("index", { userId: userId, velk: "dwadwa" });
});

app.get("/home", redirectLogin, (req, res) => {
  const { user } = res.locals;

  const { name } = res.locals;

  res.render("./pages/home", { user: user, name: name });
});

app.get("/login", redirectHome, (req, res) => {
  const { user } = res.locals;

  const { name } = res.locals;

  res.render("./pages/login", { user: user, name: name });
});

app.get("/register", redirectHome, (req, res) => {
  const { user } = res.locals;

  const { name } = res.locals;

  res.render("./pages/registter", { user: user, name: name });
});

app.post("/login", redirectHome, (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      req.session.userId = user.id;
      return res.redirect("/home");
    }
  }

  res.redirect("/login");
});

app.post("/register", redirectHome, (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const exists = users.some((user) => user.email === email);

    if (!exists) {
      const user = {
        id: users.length + 1,
        name,
        email,
        password,
      };
      users.push(user);

      req.session.userId = user.id;
      return res.redirect("/home");
    }
  } else {
    console.log(req.body);
  }
  res.redirect("/register");
});

app.post("/logout", redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/home");
    }
    res.clearCookie(SESS_NAVE);
    res.redirect("/login");
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));