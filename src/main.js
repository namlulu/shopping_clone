function loadData() {
  return fetch('data/data.json')
    .then((res) => res.json())
    .then((json) => json.items);
}

function createElement(item) {
  const img = document.createElement('img');
  const span = document.createElement('span');
  const li = document.createElement('li');

  img.setAttribute('class', 'thumbnail');
  img.setAttribute('src', item.image);

  span.setAttribute('class', 'description');
  span.innerText = `${item.gender}, ${item.size} size`;

  li.setAttribute('class', 'item');
  li.setAttribute('data-type', item.type);
  li.setAttribute('data-color', item.color);

  li.append(img);
  li.append(span);

  return li;
}

function onButtonClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateItems(items, key, value);
}
function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

loadData().then((items) => {
  const container = document.querySelector('.items');
  const elements = items.map((item) => createElement(item));
  const buttons = document.querySelector('.buttons');
  container.append(...elements);
  buttons.addEventListener('click', (event) => onButtonClick(event, elements));
});
