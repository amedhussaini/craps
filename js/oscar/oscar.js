function loadUser() {
  var template = $('#template').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {name: "Luke"});
  $('#target').html(rendered);
}


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
			//public methods
		rollDice: function() {
			this.d1 = randomRoll();
			this.d2 = randomRoll();
			total = this.d1 + this.d2;

			console.log('player rolls a ' + total);

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
			this.d1 = randomRoll();
			this.d2 = randomRoll();
			var roll = this.d1 + this.d2;
			console.log('The come out roll!');
			if (roll == 7 || roll == 11 && this.comeOut == true) {
				this.comeOutDiceRoll = roll;
				OscarsGrind.natural();
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
			}
		},
		natural: function() {
			this.bankroll += this.betUnit * this.betSize;
			this.comeOut == true;
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
		start: function() {

			OscarsGrind.setBankroll(500);
			OscarsGrind.setBetUnit(1);
			OscarsGrind.setBetSize(10);

			
			setInterval(function(){
				
				if(OscarsGrind.comeOut == true)
				{
					//update views
					OscarsGrind.comeOutRoll();
					OscarsGrind.setDiceView();
					OscarsGrind.setBankView();
					OscarsGrind.setPointView();
				} else {

					//update views
					OscarsGrind.setDiceView();
					OscarsGrind.setBankView();
					OscarsGrind.setPointView();

					OscarsGrind.rollDice();
					OscarsGrind.checkRoll();


				}

				
			}, 200);

		}



	}

})();


OscarsGrind.start();

