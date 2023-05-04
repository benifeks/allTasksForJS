function Horse(name = 'Anonim') {

  _mileage = 0; /*-> станет св-вом глобального объекта */
  let mileage = 0; /* -> сохранит контекст, как локальная переменная */
  /* this.mileage -> станет св-вом объекта "this" функции*/
  this.name = name;
  this.totalMileage = 0;

  this.run = function (kilometers) {
    mileage = mileage + kilometers;
  };

  this.getMileage = function () {
    return mileage;
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

console.log(`Пробег ${horseAnonim.name} - ${horseAnonim.getMileage()}`);
console.log(`Пробег ${horseBlack.name} - ${horseBlack.getMileage()}`);
console.log(`Пробег ${horseWhite.name} - ${horseWhite.getMileage()}`);