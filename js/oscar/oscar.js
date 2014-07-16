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
		comeOutRoll: null,
			//public methods
		rollDice: function() {
			this.d1 = randomRoll();
			this.d2 = randomRoll();


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
			var d1 = randomRoll();
			var d2 = randomRoll();
			var roll = d1 + d2;
			if (roll == 7 || roll == 11 && this.comeOut == true) {
				this.comeOutRoll = roll;
				OscarsGrind.natural();
			} else {
				this.point = roll;
				this.comeOut = false;
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
		start: function() {

			OscarsGrind.setBankroll(1000);
			OscarsGrind.setBetUnit(1);
			OscarsGrind.setBetSize(10);
			OscarsGrind.comeOutRoll();

			/*
			setInterval(function(){

				OscarsGrind.rollDice();
				OscarsGrind.setDiceView();


			}, 2000);
*/
		}



	}

})();


OscarsGrind.start();

