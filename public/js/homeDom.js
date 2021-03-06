// const select = selector => document.querySelector(selector);
// const create = type => document.createElement(type);
//
// select('.log-out').addEventListener('click', (event) => {
//   event.preventDefault();
//   const reqObject = {
//     url: '/log-out',
//     method: 'GET',
//   };
//   request(reqObject, (res, err) => {
//     if(err) console.log(err);
//     if (res) {
//       window.location.pathname = '/';
//     }
//   });

const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);

select('.log-out').addEventListener('click', (event) => {
  event.preventDefault();
  const reqObject = {
    url: '/log-out',
    method: 'POST',
  };
  request(reqObject, (res, err) => {
    if (res) {
      window.location.pathname = '/';
    }
  });
});
