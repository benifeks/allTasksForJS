function Horse(distance, name = 'Anonim') {

  _mileage = 0;
  this.name = name;
  this.distance = 0;
  this.totalMileage = 0;

  this.run = function() {

    this.distance = this.distance + distance;
    _mileage = _mileage + distance;
    this.totalMileage = _mileage;

  };

  this.getMileage = function() {
    return this.distance;
  };

  this.actualTotalMileage = function() {
    return _mileage;
  }

}

let horseAnonim = new Horse(7);
let horseBlack = new Horse(3, 'Black');
let horseWhite = new Horse(5, 'White');

horseAnonim.run();
horseAnonim.run();
horseBlack.run();
horseBlack.run();
horseWhite.run();

console.log(`Пробег ${horseAnonim.name} - ${horseAnonim.getMileage()}`)
console.log(`Пробег ${horseBlack.name} - ${horseBlack.getMileage()}`)
console.log(`Пробег ${horseWhite.name} - ${horseWhite.getMileage()}`)
console.log(`---------`)

console.log(`Общий пробег - ${horseAnonim.totalMileage}`)
console.log(`Общий пробег - ${horseBlack.totalMileage}`)
console.log(`Общий пробег - ${horseWhite.totalMileage}`)
console.log(`---------`)

console.log(`Актуальный общий пробег - ${horseAnonim.actualTotalMileage()}`)
console.log(`Актуальный общий пробег - ${horseBlack.actualTotalMileage()}`)
console.log(`Актуальный общий пробег- ${horseWhite.actualTotalMileage()}`)