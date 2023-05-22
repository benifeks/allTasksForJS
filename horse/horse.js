
function Horse(name = 'Anonim') {

  this.name = name;
  let _mileage = 0;
  Horse.prototype.totalMileage = 0;

  this.run = function(kilometers = 0) {

    _mileage = _mileage + kilometers;
    Horse.prototype.totalMileage = Horse.prototype.totalMileage + kilometers;

  };

  this.getMileage = function() {
    return _mileage;
  };

}

let horseAnonim = new Horse();
let horseBlack = new Horse('Black');
let horseWhite = new Horse('White');

horseAnonim.run(7);
horseAnonim.run(3);
horseBlack.run(3);
horseBlack.run(7);
horseWhite.run(5);

console.log(`Общий пробег у ${horseAnonim.name} - ${horseAnonim.totalMileage}`)
console.log(`Общий пробег у  ${horseBlack.name} - ${horseBlack.totalMileage}`)
console.log(`Общий пробег у  ${horseWhite.name} - ${horseWhite.totalMileage}`)