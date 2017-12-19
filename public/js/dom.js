function request(cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        cb(JSON.parse(xhr.responseText));
      } else {
        cb(`Error Occured!!, on: ${url} with response: ${error}`);
      }
    }
  };
  xhr.open('POST', '/home', true);
  xhr.send();
}

function create(type) {
  return document.createElement(type);
}

function displayPosts(data, err) {
  if (err) {
    alert(err);
  }
  const wrapper = document.querySelector('.wrapper');
  if (wrapper.textContent) {
    wrapper.textContent = '';
  }
  console.log(data);
  data.forEach((post) => {
    const article = create('article');
    article.className = 'one-post';
    article.id = post.id;
    const publisher = create('h1');
    publisher.className = 'post-publisher';
    publisher.textContent = post.name;
    const postParagraph = create('p');
    postParagraph.className = 'post-content';
    postParagraph.textContent = post.post;
    article.appendChild(publisher);
    article.appendChild(postParagraph);
    wrapper.appendChild(article);
  });
}


document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    request(displayPosts);
  }
};
