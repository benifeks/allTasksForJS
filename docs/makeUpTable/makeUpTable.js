function getDeckData() {

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
      console.log('err', request.responseText);
    });
  }).then((receivedData) => {

    let dataTable = receivedData.map((elem, i) => {
      return {

        firstName: receivedData[i].profile.name.split(" ")[0],
        lastName: receivedData[i].profile.name.split(" ")[1],
        sex: ' - ',
        age: new Date().getFullYear() - (+receivedData[i].profile.dob.split("-")[0]),
        email: receivedData[i].email,
        phone: ' - ',
        company: receivedData[i].profile.company

      };

    });

    return dataTable;

  }).then((dataTable) => {

    table(dataTable);

  }).catch(() => {

    console.log('Произошла ошибка...');

  }).finally(() => {

    console.log('finally');

  });

}

function table(arg) {

  let table = document.getElementById('table');

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

  });

}

