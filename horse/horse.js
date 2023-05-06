function Horse(name = 'Anonim') {

  this.name = name;
  let _mileage = 0;

  this.run = function(kilometers = 0) {
    _mileage = _mileage + kilometers;
    return _mileage;
  };

  this.getMileage = function() {
    return _mileage;
  };

}

let horseAnonim = new Horse();
let horseBlack = new Horse('Black');
let horseWhite = new Horse('White');


console.log(`Пробег ${horseAnonim.name} - ${horseAnonim.getMileage()}`)
console.log(`Пробег ${horseBlack.name} - ${horseBlack.getMileage()}`)
console.log(`Пробег ${horseWhite.name} - ${horseWhite.getMileage()}`)

horseAnonim.run(7);
horseAnonim.run(3);
horseBlack.run(3);
horseBlack.run(7);
horseWhite.run(5);
console.log(`---------`)

console.log(`Пробег ${horseAnonim.name} - ${horseAnonim.getMileage()}`)
console.log(`Пробег ${horseBlack.name} - ${horseBlack.getMileage()}`)
console.log(`Пробег ${horseWhite.name} - ${horseWhite.getMileage()}`)

let horseGreen = new Horse('Green');

horseGreen.run(5);
horseAnonim.run(10);
horseBlack.run(10);
horseWhite.run(10);

console.log(`---------`)
console.log(`Пробег ${horseAnonim.name} - ${horseAnonim.getMileage()}`)
console.log(`Пробег ${horseBlack.name} - ${horseBlack.getMileage()}`)
console.log(`Пробег ${horseWhite.name} - ${horseWhite.getMileage()}`)
console.log(`Пробег ${horseGreen.name} - ${horseGreen.getMileage()}`)

console.log(`Пробег ${horseGreen.name} - ${horseGreen._mileage}`)