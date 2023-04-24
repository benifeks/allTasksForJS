function Horse(run, name = 'Anonim') {

  _mileage = 0;
  _totalMileage = 0;
  this.name = name;

  let mileage = 0;

  this.run = function() {
    
    mileage = mileage + run;
    _totalMileage = _totalMileage + run;
    return run;
  };

  this.getMileage = function() {
    return mileage;
  };

  this.getTotalMileage = function() {
    return _totalMileage;
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

console.log(`Пробег "${horseAnonim.name}" - ${horseAnonim.getMileage()}`)
console.log(`Пробег "${horseBlack.name}" - ${horseBlack.getMileage()}`)
console.log(`Пробег "${horseWhite.name}" - ${horseWhite.getMileage()}`)

console.log(`Общий пробег - ${horseAnonim.getTotalMileage()}`)
console.log(`Общий пробег - ${horseBlack.getTotalMileage()}`)
console.log(`Общий пробег - ${horseWhite.getTotalMileage()}`)