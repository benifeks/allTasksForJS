let dataTable = [];
let sortSwitch = true;
let orderedData = {
  keysByAge: [],
  keysByCompany: [],
  age: {},
  company: {},
};
let btnReceiveAndComplete = document.getElementById("receiveAndComplete");
let btnSort = document.querySelectorAll('.btnSort');
let allSelect = document.querySelectorAll('select');
let selectAge = document.getElementById("selectAge");
let selectCompany = document.getElementById("selectCompany");

function getDeckData() {

  fetch('https://api.json-generator.com/templates/AOzpFb4MT-L4/data?access_token=36t14ch1xduguysq3wvchsxb5gicbyufqugze286')

    .then((response) => {

      return response.json();

    })
    .then((receivedData) => {

      dataTable = receivedData.map((elem, i) => {
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

    })
    .then(() => {

      clearOrderedData();
      allSelect.forEach(option => option[0].value = true);
      updateDirectionArrows();
      clearOptions();
      blockButtons();

    })
    .then(() => {

      renderTable(dataTable);

      fillCollectionOfKeys(dataTable, 'age');
      fillCollectionOfKeys(dataTable, 'company');

      organizeData(dataTable, orderedData.keysByAge, 'age');
      organizeData(dataTable, orderedData.keysByCompany, 'company');

      createOptions();

    })
    .catch((error) => {

      document.querySelector('#body').innerHTML = 'ОШИБКА ПРИ ОБРАБОТКЕ ДАННЫХ...';
      console.log(error.message);

    });

}

btnReceiveAndComplete.addEventListener("click", getDeckData);


function blockButtons() {

  btnSort.forEach((button) => {

    if (dataTable.length === 0) {

      button.disabled = true;
      return;

    }

    if (dataTable.length > 0) {

      button.disabled = false;
      return;

    }

  });

}

blockButtons();


function renderTable(data) {

  let table = document.getElementById('body');
  table.textContent = '';

  data.forEach((user) => {

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

  });

}


function fillCollectionOfKeys(data, argumentKey) {

  let arrayAllValues = data.map(element => element[argumentKey]);
  let uniqueValues = new Set(arrayAllValues);

  uniqueValues = [...uniqueValues];

  if (argumentKey === 'age') {

    orderedData.keysByAge = uniqueValues;

  } else {

    orderedData.keysByCompany = uniqueValues;

  }

}


function organizeData(data, arrayKeys, orderedDataKey) {

  arrayKeys.forEach((key) => {

    orderedData[`${orderedDataKey}`][key] = [];
    let arrayValues = orderedData[`${orderedDataKey}`][key];

    data.forEach((elem) => {

      if (key === elem[`${orderedDataKey}`]) {
        arrayValues.push(elem);
      }

    });

  });

}


function clearOrderedData() {

  orderedData.keysByAge = [];
  orderedData.keysByCompany = [];
  Object.keys(orderedData.age).forEach(key => delete orderedData.age[key]);
  Object.keys(orderedData.company).forEach(key => delete orderedData.company[key]);

}


function sortTableAscending(argument, data) {

  let result = data.sort((a, b) => {

    if (a[argument] < b[argument]) {
      return -1;

    }

  });

  renderTable(result);

}


function sortTableDescending(argument, data) {

  let result = data.sort((a, b) => {

    if (a[argument] > b[argument]) {

      return -1;

    }

  });

  renderTable(result);

}



function toggleSortOrder(name, data) {

  if (sortSwitch) {

    sortSwitch = false;
    sortTableAscending(name, data);
    return;

  }

  if (!sortSwitch) {

    sortSwitch = true;
    sortTableDescending(name, data);
    return;

  }

}


function updateDirectionArrows() {

  btnSort.forEach((button) => {

    button.innerHTML = '';
    button.innerHTML = `&#8660;`;

  });

}

btnSort.forEach((button) => {

  button.addEventListener("click", () => {

    updateDirectionArrows();
    toggleSortOrder(button.name, dataTable);

    if (sortSwitch) {

      button.innerHTML = `&#8657;`;
      return;

    }

    if (!sortSwitch) {

      button.innerHTML = `&#8659;`;
      return;

    }

  });

});


function createOptions() {

  allSelect.forEach((option) => {

    if (JSON.parse(option[0].value)) {

      let optionArray = Array.prototype.slice.call(option);

      optionArray.forEach((curentOption) => {

        if (!curentOption.disabled) {

          curentOption.remove();

        }

      });

      let keys = option[0].parentNode.id === "selectAge" ? orderedData.keysByAge : orderedData.keysByCompany;

      keys.forEach((element) => {

        let optionsSelect = document.createElement('option');
        optionsSelect.value = JSON.stringify(element);
        optionsSelect.text = optionsSelect.value;
        document.getElementById(option[0].parentNode.id).append(optionsSelect);

      });

    }

  });

}


function clearOptions() {

  allSelect.forEach((option) => {

    let optionArray = Array.prototype.slice.call(option);

    optionArray.forEach((option) => {

      if (!option.disabled) {

        option.remove();

      }

    });

  });

}


function createDataTableSelect(select) {

  let selectedValues = [];
  let optionsSelectArray = Array.prototype.slice.call(select);

  allSelect.forEach(option => option[0].value = true);

  optionsSelectArray.forEach((option) => {

    select[0].value = false;

    if (option.selected) {

      selectedValues.push(orderedData[select[0].innerHTML][JSON.parse(option.value)]);
    }

  });

  dataTable = selectedValues.flat();
  renderTable(dataTable);

}


function changeOption() {

  updateDirectionArrows();
  createDataTableSelect(this.options);

  orderedData.keysByAge = [];
  orderedData.keysByCompany = [];

  fillCollectionOfKeys(dataTable, 'age');
  fillCollectionOfKeys(dataTable, 'company');

  createOptions();

}


selectAge.addEventListener("change", changeOption);
selectCompany.addEventListener("change", changeOption);

