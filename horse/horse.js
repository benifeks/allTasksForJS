function Horse(runAway, name = 'Anonim') {

  _mileage = 0;
  this.name = name;
  this.runAway = runAway;
  this.getMileage = function (argument) {
    _mileage = _mileage + this.runAway;
    return _mileage;
  };

}

let horse = new Horse(7);

console.log(`Имя - ${horse.name}`)
console.log(`Бежать - ${horse.runAway}`)
console.log(`Приватное свойство "Пробег" - ${horse._mileage}`)
console.log(`Получить Пробег - ${horse.getMileage()}`)