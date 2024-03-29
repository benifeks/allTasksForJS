function rollTheDice() {

  let cubeFacesImagePath = '<img class="dice" src="img/n{number}.png" />';

  let diceSide1 = document.getElementById('diceSide_1');
  let diceSide2 = document.getElementById('diceSide_2');
  let diceSide3 = document.getElementById('diceSide_3');

  let side1 = Math.floor(Math.random() * 6) + 1;
  let side2 = Math.floor(Math.random() * 6) + 1;
  let side3 = Math.floor(Math.random() * 6) + 1;

  diceSide1.innerHTML = cubeFacesImagePath.replace('{number}', side1);
  diceSide2.innerHTML = cubeFacesImagePath.replace('{number}', side2);
  diceSide3.innerHTML = cubeFacesImagePath.replace('{number}', side3);

  horseAnonim.run(side1);
  horseBlack.run(side2);
  horseWhite.run(side3);

}


function playRun(options) {

  let distance = options.distance;
  let amount = options.amount;
  let mileageName = options.mileageName;
  let mileage = options.mileage;

  amount.style.marginLeft = `${+amount.style.marginLeft.slice(0, -2) + distance * 10}px`;
  mileageName.innerHTML = mileage;
  document.querySelector('.totalScore').innerHTML = Horse.prototype.totalMileage;

}


function Horse(name = 'Anonim') {

  this.mileageHorseName = document.querySelector(`.mileageHorse${name}`);
  this.amountHorseName = document.querySelector(`.amountHorse${name}`);
  this.coordinatesHorse = this.amountHorseName.getBoundingClientRect();
  this.coordinatesHorseLeft = this.coordinatesHorse.left;
  this.amountHorseName.style.marginLeft = `${this.coordinatesHorseLeft}px`;

  this.name = name;
  let _mileage = 0;
  Horse.prototype.totalMileage = 0;
  this.tiredness = 0;

  this.run = function (kilometers = 0) {

    _mileage = _mileage + kilometers;
    Horse.prototype.totalMileage = Horse.prototype.totalMileage + kilometers;
    this.tiredness = this.tiredness + kilometers;

    if (this.tiredness < 10) {

      playRun({
        distance: kilometers,
        amount: this.amountHorseName,
        mileageName: this.mileageHorseName,
        mileage: this.getMileage()
      });

      return;

    }

    let remainder = 0;
    let kilometersBeforeRest = 0;

    remainder = this.tiredness - 10;
    kilometersBeforeRest = kilometers - remainder;
    Horse.prototype.totalMileage = Horse.prototype.totalMileage - remainder;
    _mileage = _mileage - remainder;

    playRun({
      distance: kilometersBeforeRest,
      amount: this.amountHorseName,
      mileageName: this.mileageHorseName,
      mileage: this.getMileage()
    });

    if (remainder !== 0) {

      this.mileageHorseName.innerHTML = `REST 3 SECONDS...`;
      this.mileageHorseName.style.color = 'Red';

    }

    setTimeout(() => {

      this.mileageHorseName.style.color = 'Black';
      this.mileageHorseName.innerHTML = this.getMileage();
      this.tiredness = 0;
      this.tiredness = this.tiredness + remainder;
      Horse.prototype.totalMileage = Horse.prototype.totalMileage + remainder;
      _mileage = _mileage + remainder;

      playRun({
        distance: remainder,
        amount: this.amountHorseName,
        mileageName: this.mileageHorseName,
        mileage: this.getMileage()
      });

    }, 3000)



  };

  this.getMileage = function () {
    return _mileage;
  };

}


let horseAnonim = new Horse();
let horseBlack = new Horse('Black');
let horseWhite = new Horse('White');