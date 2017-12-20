const request = (reqObject, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      } else {
        alert('Error, Something didnt go well.');
      }
    }
  };
  if (reqObject.method === 'GET') {
    xhr.open('GET', reqObject.url, true);
    xhr.send(reqObject.body);
  } else if (reqObject.metho === 'POST') {
    xhr.open('POST', reqObject.url, true);
    xhr.send(reqObject.body);
  }
};
