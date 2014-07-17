window.OscarsGrind = (function() {



	//private variables
	randomRoll = function() {
		return Math.floor(Math.random() * 6) + 1;
	}

	return {

		d1: null,
		d2: null,
		bankroll: null,
		betUnit: null,
		betSize: null,
		point: null,
		comeOut: true,
		comeOutDiceRoll: null,
		diceHistory: {
			two: 0,
			three: 0,
			four: 0,
			five: 0,
			six: 0,
			seven: 0,
			eight: 0,
			nine: 0,
			ten: 0,
			eleven: 0,
			twelve: 0			
			//public methods
		},
		rollDice: function() {
			this.d1 = randomRoll();
			this.d2 = randomRoll();
			total = this.d1 + this.d2;

			console.log('player rolls a ' + total);

			switch(total) {
				case 2:
					this.diceHistory.two += 1;
					break;
				case 3:
					this.diceHistory.three += 1;
					break;
				case 4:
					this.diceHistory.four += 1;
					break;
				case 5:
					this.diceHistory.five += 1;
					break;
				case 6:
					this.diceHistory.six += 1;
					break;
				case 7:
					this.diceHistory.seven += 1;
					break;
				case 8:
					this.diceHistory.eight += 1;
					break;
				case 9:
					this.diceHistory.nine += 1;
					break;
				case 10:
					this.diceHistory.ten += 1;
					break;
				case 11:
					this.diceHistory.eleven += 1;
					break;
				case 12:
					this.diceHistory.twelve += 1;
					break;					
			}

		},
		setBankroll: function(_bankroll) {

			this.bankroll = _bankroll;

		},
		setBetSize: function(_betSize) {
			this.betSize = _betSize;
		},
		setPoint: function(_point) {
			this.point = _point;
		},
		comeOutRoll: function() {
			this.rollDice();
			var roll = this.d1 + this.d2;
			console.log('The come out roll!');
			if (roll == 7 || roll == 11 && this.comeOut == true) {
				this.comeOutDiceRoll = roll;
				this.bankroll += this.betUnit * this.betSize;
				this.comeOut = true;
				console.log('player rolls a natural!');

			} else if(roll == 2 || roll == 3 || roll == 12){
				this.bankroll -= this.betUnit * this.betSize;
				this.comeOut = true;
				console.log('player craps out with a ' + roll);
			} else {
				this.point = roll;
				this.comeOut = false;
				console.log('player sets point to ' + this.point);
				OscarsGrind.updateViews();
			}
		},
		getBankroll: function() {
			console.log(this._bankroll);
		},
		setBetUnit: function(_betunit) {
			this.betUnit = _betunit;
		},
		getBetUnit: function() {
			console.log(this.betUnit);
		},
		setDiceView: function() {
		 	var template = $('#template').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, {dice1: this.d1, dice2: this.d2});
		 	$('#target').html(rendered);
		},
		setBankView: function() {

		 	var template = $('#template2').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, {bankroll: this.bankroll, bankunit: this.betUnit, betsize: this.betSize });
		 	$('#target2').html(rendered);


		},
		setPointView: function() {

		 	var template = $('#template3').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, {point: this.point });
		 	$('#target3').html(rendered);


		},
		checkRoll: function() {
			var currentDice = this.d1 + this.d2;
			if(currentDice == this.point) {
				this.bankroll += this.betUnit * this.betSize;
				this.comeOut = true;
				this.point = null;
				console.log('hit the point');
			}

			if(currentDice == 7) {
				console.log('seven out');
				OscarsGrind.comeOut == true;
				this.bankroll -= this.betUnit * this.betSize;
				this.point = null;
				this.comeOut = true;
			}
		},
		updateViews: function() {
					OscarsGrind.setDiceView();
					OscarsGrind.setBankView();
					OscarsGrind.setPointView();
		},
		start: function() {

			OscarsGrind.setBankroll(200);
			OscarsGrind.setBetUnit(1);
			OscarsGrind.setBetSize(10);

			
			setInterval(function(){
				
				if(OscarsGrind.comeOut == true)
				{
					//update views
					OscarsGrind.updateViews();
					OscarsGrind.comeOutRoll();

				} else {

					//update views

					OscarsGrind.rollDice();
					OscarsGrind.updateViews()
					OscarsGrind.checkRoll();


				}

				
			}, 5000);

		}



	}

})();


OscarsGrind.start();

