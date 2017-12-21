const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);

const login = select('.login-btn');
const guest = select('.guest-btn');
const catchLogInfo = () => {
  const username = select('.username').value;
  const password = select('.password').value;
  return { username, password };
};

login.addEventListener('click', (event) => {
  event.preventDefault();
  const logInfo = catchLogInfo();
  if (!validateLogin(logInfo.username, logInfo.password)) {
    alert('Please enter your username & password');
  } else {
    const reqObject = {
      method: 'POST',
      body: JSON.stringify(logInfo),
      url: '/login',

    };
    request(reqObject, (err, res) => {
      if (err) {
        console.log('error happened',err);
      } else if (res === 'Password_is_wrong' || res === 'User_not_found'){
        if(res=='Password_is_wrong') {
          select('#abc').textContent = 'Wrong Password';
          select('#abc').style.visibility = 'visible';
        } else {
          select('#abc').textContent = 'Wrong username';
          select('#abc').style.visibility = 'visible';
      }
    } else {
      window.location.pathname = '/home';
    }
    });
  }
});
