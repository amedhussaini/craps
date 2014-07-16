function loadUser() {
  var template = $('#template').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {name: "Luke"});
  $('#target').html(rendered);
}


window.OscarsGrind = (function() {

	//private variables

	var _bankroll = null;
	var _betUnit = null;
	var _betSize = null

	return {

		d1: null,
		d2: null,

			//public methods
		rollDice: function() {
			this.d1 = Math.floor(Math.random() * 6) + 1;
			this.d2 = Math.floor(Math.random() * 6) + 1;
		},
		setBankroll: function(bankroll) {

			this._bankroll = bankroll;

		},
		getBankroll: function() {
			console.log(this._bankroll);
		},
		setBetUnit: function(betunit) {
			this._betUnit = betunit;
		},
		getBetUnit: function() {
			console.log(this._betUnit);
		},
		loadUser: function() {
		 	var template = $('#template').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, {name: this.d1, name2: this.d2});
		 	$('#target').html(rendered);
		}



	}

})();

OscarsGrind.rollDice();

