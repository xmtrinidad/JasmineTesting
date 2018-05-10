const User = require('../User');

exports.get_index = (req, res) => {
  res.render('index');
};

exports.post_form = (req, res) => {
  const user = new User(req.body.name, req.body.password);
  //Check if user submits form with clean
  if (req.body.clean === '') {
    user.makeNameValid(); // clean name
    res.render('index', { name: user.name });
    return;
  }

  // Check if name is valid
  if (!user.nameIsValid()) {
    const msg = "Name contains invalid characters or is empty.  Click 'clean' to remove invalid characters."
    res.render('error', { msg: User.errorMessage(msg), name: req.body.name });
    return;
  }

  if (!user.passwordIsValid()) {
    const msg = "Password must be at least 4 characters long"
    res.render('index', { msg: User.errorMessage(msg), name: req.body.name });
    return;
  }

  user.submitData().then((data) => {
    res.render('greeting', { name: user.name, password: user.pw });
  });

};