function rollTheDice() {

  let facesCube = {
    1: `<img class="dice" src="img/n1.png" />`,
    2: `<img class="dice" src="img/n2.png" />`,
    3: `<img class="dice" src="img/n3.png" />`,
    4: `<img class="dice" src="img/n4.png" />`,
    5: `<img class="dice" src="img/n5.png" />`,
    6: `<img class="dice" src="img/n6.png" />`,
  }

  let diceSide1 = document.getElementById('diceSide_1');
  let diceSide2 = document.getElementById('diceSide_2');
  let diceSide3 = document.getElementById('diceSide_3');

  let side1 = Math.floor(Math.random() * 6) + 1;
  let side2 = Math.floor(Math.random() * 6) + 1;
  let side3 = Math.floor(Math.random() * 6) + 1;

  diceSide1.innerHTML = facesCube[side1];
  diceSide2.innerHTML = facesCube[side2];
  diceSide3.innerHTML = facesCube[side3];

  horseAnonim.run(side1);
  horseBlack.run(side2);
  horseWhite.run(side3);

}


function playRun(options) {

  let distance = options.distance;
  let amount = options.amount;
  let mileageName = options.mileageName;
  let mileage = options.mileage;

  for (let i = 1; i <= distance; i++) {

    setTimeout(() => {

      amount.style.marginLeft = `${+amount.style.marginLeft.slice(0, -2) + 10}px`;
      mileageName.innerHTML = mileage - distance + i;
      document.querySelector('.totalScore').innerHTML = Horse.prototype.totalMileage;

    }, i * 300);

  }

}


function Horse(name = 'Anonim') {

  this.buttonHorseName = document.getElementById(`buttonHorse${name}`);
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

    } else {

      let remainder = 0;
      remainder = this.tiredness - 10;
      kilometers = kilometers - remainder;
      Horse.prototype.totalMileage = Horse.prototype.totalMileage - remainder;
      _mileage = _mileage - remainder;

      playRun({
        distance: kilometers,
        amount: this.amountHorseName,
        mileageName: this.mileageHorseName,
        mileage: this.getMileage()
      });

      setTimeout(() => {

        if (remainder !== 0) {

          this.mileageHorseName.innerHTML = `REST 3 SECONDS...`;
          this.mileageHorseName.style.color = 'Red';
        }


      }, kilometers * 300);

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

    }

  };

  this.getMileage = function () {
    return _mileage;
  };

}


let horseAnonim = new Horse();
let horseBlack = new Horse('Black');
let horseWhite = new Horse('White');