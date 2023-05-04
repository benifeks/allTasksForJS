async function getDeckData() {

  const promise1 = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(
      'GET',
      'https://api.json-generator.com/templates/AOzpFb4MT-L4/data?access_token=36t14ch1xduguysq3wvchsxb5gicbyufqugze286',
    );
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    request.send();
    request.addEventListener('load', () => {

      if (request.status === 200) {
        let receivedData = JSON.parse(request.response);
        resolve(receivedData);
        return;
      }

      document.querySelector('#body').innerHTML = 'ОШИБКА ПРИ ПОЛУЧЕНИИ ДАННЫХ...';
      console.log('ОШИБКА ПРИ ПОЛУЧЕНИИ ДАННЫХ', request.responseText);
    });
  });

  promise1.then((receivedData) => {

    let dataTable = receivedData.map((elem, i) => {
      return {

        firstName: receivedData[i].profile.name.split(" ")[0],
        lastName: receivedData[i].profile.name.split(" ")[1],
        sex: ' - ',
        age: new Date().getFullYear() - (+receivedData[i].profile.dob.split("-")[0]),
        email: receivedData[i].email,
        phone: ' - ',
        company: receivedData[i].profile.company

      }

    });

    return dataTable;

  }).then((dataTable) => {

    table(dataTable);

  }).then(() => {

    let table = document.getElementById('table');

    sortTableByColumn(table);

  }).catch(() => {

    document.querySelector('#body').innerHTML = 'ОШИБКА ПРИ ОБРАБОТКЕ ДАННЫХ...';
    console.log('ОШИБКА ПРИ ОБРАБОТКЕ ДАННЫХ...');

  }).finally(() => {

    console.log('finally');

  });
}

function table(arg) {

  let table = document.getElementById('body');
  table.textContent = '';

  arg.forEach((user) => {

    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.textContent = user.firstName;
    tr.append(td1);

    let td2 = document.createElement('td');
    td2.textContent = user.lastName;
    tr.append(td2);

    let td3 = document.createElement('td');
    td3.textContent = user.sex;
    tr.append(td3);

    let td4 = document.createElement('td');
    td4.textContent = user.age;
    tr.append(td4);

    let td5 = document.createElement('td');
    td5.textContent = user.email;
    tr.append(td5);

    let td6 = document.createElement('td');
    td6.textContent = user.phone;
    tr.append(td6);

    let td7 = document.createElement('td');
    td7.textContent = user.company;
    tr.append(td7);

    table.append(tr);

  })

}

function sortTableByColumn(htmlTableObject) {

  function htmlSort(arg = '') {

    let divSort = document.querySelector('#divSort');
    divSort.textContent = '';
    divSort.textContent = arg;

  }

  htmlSort('кликните по названию колонки для сортировки');

  let head = htmlTableObject.tHead;
  head.style.backgroundColor = '#00BFFF';
  head.setAttribute("title", "кликните для сортировки")

  let body = htmlTableObject.tBodies[0];

  let columnMarks = head.children[0].children;

  let rows = body.children;

  let position;

  let trigger = true;

  htmlTableObject.addEventListener('click', handler1);

  function handler1(event) {

    let t = event.target;
    if (t.parentNode === columnMarks[0].parentNode) {
      position = [...columnMarks] 
        .findIndex(element => element == t);
      handler2(position);
    }
  }

  function handler2(currentPosition) {
    if (trigger) {
      trigger = false;
      body.replaceChildren(...sortBodyAsc(currentPosition));
    } else {
      trigger = true;
      body.replaceChildren(...sortBodyDesc(currentPosition));
    }
  }

  function sortBodyAsc(position) {
    htmlSort('сортированно по возрастанию');
    return [...rows].sort((a, b) => {
      let result;
      let stringA = a.children[position].innerText;
      let stringB = b.children[position].innerText;
      let numberA = +a.children[position].innerText;
      let numberB = +b.children[position].innerText;

      if (numberA) {
        result = numberA < numberB ? -1 : 1;
      } else {
        result = stringA < stringB ? -1 : 1;
      }
      return result;
    });
  }

  function sortBodyDesc(position) {
    htmlSort('сортированно по убыванию');
    return [...rows].sort((a, b) => {
      let result;
      let stringA = a.children[position].innerText;
      let stringB = b.children[position].innerText;
      let numberA = +a.children[position].innerText;
      let numberB = +b.children[position].innerText;

      if (numberA) {
        result = numberA > numberB ? -1 : 1;
      } else {
        result = stringA > stringB ? -1 : 1;
      }
      return result;
    });
  }

}
