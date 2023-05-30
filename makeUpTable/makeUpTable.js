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
    htmlSort(`Выберите колонку для сортировки...`);
    filterTable(dataTable);

    return dataTable;

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

function sortTableByColumn(data) {

  let btnAll = document.querySelectorAll('.btn');

  btnAll.forEach((button) => {

    button.addEventListener("click", () => {

      sortTable(button.name, data);

      htmlSort(`Сортированно по ${button.value}`)

    });

  });

}

function sortTable(argument, data) {

  let result = data.sort((a, b) => {

    if (a[argument] < b[argument]) {
      return -1;
    }

  })

  table(result);

}

function htmlSort(arg = '') {

  let divSort = document.querySelector('#divSort');
  divSort.textContent = '';
  divSort.textContent = arg;

}
///////////////////////////////////////////////////////////

function createOptions(id, data, text, name = 0) {

  let select = document.getElementById(`${id}`);
  select.multiple = true;

  data.forEach((element, i) => {

    let nameItem;
    if (name === 0) {
      nameItem = '';
    } else {
      nameItem = element[name];
    }
    let optionsSelect = document.createElement('option');
    optionsSelect.text = `${nameItem} ${element[text]}`;
    optionsSelect.value = JSON.stringify(element);
    select.append(optionsSelect);

  });

}

let buttonAge = document.getElementById('buttonAge');
let buttonCompany = document.getElementById('buttonCompany');
let buttonUpdate = document.getElementById('buttonUpdate');

function filterTable(data) {

  let result;

  let collection = new Map();

  let selectAge = document.getElementById('selectAge');
  let selectedOptionsAge = selectAge.selectedOptions;

  let selectCompany = document.getElementById('selectCompany');
  let selectedOptionsCompany = selectCompany.selectedOptions;

  createOptions('selectAge', data, 'age', 'firstName');
  createOptions('selectCompany', data, 'company');

  buttonAge.onclick = function () {

    result = [];
    collection.clear();

    for (let i = 0; i < selectedOptionsAge.length; i++) {

      let valueOption = selectedOptionsAge[i].value;
      if (valueOption === "age") {
        break;
      }

      collection.set(JSON.parse(valueOption).company, JSON.parse(valueOption));

    }

    collection.forEach(value => result.push(value));

    if (result.length === 0) {

      return;

    } else {

      table(collection);

      selectAge.replaceChildren();
      selectAge.innerHTML = `<option selected disabled>age</option>`;

      if (buttonCompany.disabled === false) {
        selectCompany.replaceChildren();
        selectCompany.innerHTML = `<option selected disabled>company</option>`;
        createOptions('selectCompany', collection, 'company');
      }

      buttonAge.disabled = true;
      sortTableByColumn(result);
    }

  }

  buttonCompany.onclick = function () {

    result = [];
    collection.clear();

    for (let i = 0; i < selectedOptionsCompany.length; i++) {

      let valueOption = selectedOptionsCompany[i].value;
      if (valueOption === "company") {
        break;
      }

      collection.set(JSON.parse(valueOption).company, JSON.parse(valueOption));

    }

    collection.forEach(value => result.push(value));

    if (result.length === 0) {

      return;

    } else {

      table(collection);

      selectCompany.replaceChildren();
      selectCompany.innerHTML = `<option selected disabled>company</option>`;

      if (buttonAge.disabled === false) {
        selectAge.replaceChildren();
        selectAge.innerHTML = `<option selected disabled>age</option>`;
        createOptions('selectAge', collection, 'age', 'firstName');
      }

      buttonCompany.disabled = true;
      sortTableByColumn(result);

    }

  }

  buttonUpdate.onclick = function () {

    buttonAge.disabled = false;
    buttonCompany.disabled = false;
    table(data);
    filterTable(data);
    sortTableByColumn(data);

  }
  sortTableByColumn(data);

}
