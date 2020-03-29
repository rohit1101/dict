const inpEl = document.querySelector('.inp');
const baseURL = `https://mashape-community-urban-dictionary.p.rapidapi.com/define`;
const result = document.querySelector('.result');
const defineHead = document.querySelector('.de');
const exHead = document.querySelector('.ex');
const p = document.createElement('p');
const p1 = document.createElement('p');
p1.classList.add('example');
p.classList.add('define');
const h1 = document.createElement('h1');
h1.classList.add('d');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.previous');
const modal = document.querySelector('.modal');
const del = document.querySelector('.close');

let dictArr = [];
let i = 0;

function render() {
  h1.textContent = `I am ${dictArr[i].word}`;
  p.textContent = dictArr[i].definition;
  p1.textContent = dictArr[i].example;
  result.insertAdjacentElement('beforebegin', h1);
  defineHead.insertAdjacentElement('afterend', p);
  exHead.insertAdjacentElement('afterend', p1);
}

async function getData(input) {
  const response = await fetch(baseURL + `?term=${input}`, {
    headers: {
      'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
      'X-RapidAPI-Key': 'aea9559aa1msh5b956b19e632e92p1bb553jsn24af3d2c0d36'
    }
  });
  const data = await response.json();
  const arrData = data.list;
  dictArr = arrData;
  render();
}

nextBtn.addEventListener('click', e => {
  i++;
  if (i === dictArr.length) {
    i = dictArr.length - 1;
    modal.style.display = 'block';
  }
  render();
});

previousBtn.addEventListener('click', e => {
  i--;
  if (i < 0) {
    i = 0;
    modal.style.display = 'block';
  }
  render();
});

del.addEventListener('click', e => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  console.log(e.target);
  if (e.target.className == 'modal') {
    modal.style.display = 'none';
  }
});

window.onload = getData('Iron man');

window.addEventListener('keydown', e => {
  if (e.keyCode == 13 && inpEl.value !== '') {
    getData(inpEl.value);
    inpEl.value = '';
    i = 0;
  }
});
// -----------SORTING----------

// const sorted = arrData.sort((a, b) => {
//   return b.thumbs_up - a.thumbs_up;
// });
// sorted.forEach(item => {
//   console.log(item);
//   if (item.word === input || item.thumbs_up > 500) {
//     h1.textContent = `I am ${item.word}`;
//     p.textContent = item.definition;
//     p1.textContent = item.example;
//     result.insertAdjacentElement('beforebegin', h1);
//     defineHead.insertAdjacentElement('afterend', p);
//     exHead.insertAdjacentElement('afterend', p1);
//   }
// });

// -----------Rendering---------

// arrData.forEach(item => {
// console.log(item);
// if (item.word === input || item.thumbs_up > 500) {
//   h1.textContent = `I am ${item.word}`;
//   p.textContent = item.definition;
//   p1.textContent = item.example;
//   result.insertAdjacentElement('beforebegin', h1);
//   defineHead.insertAdjacentElement('afterend', p);
//   exHead.insertAdjacentElement('afterend', p1);
// }
// });
