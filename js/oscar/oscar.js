window.OscarsGrind = (function() {

	var loop;

	var history = new Array();

	//private variables
	randomRoll = function() {
		return Math.floor(Math.random() * 6) + 1;
	}

	return {

		d1: null,
		d2: null,
		bankroll: null,
		passLine: null,
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
		},
		lastRound: null,
		diceRolls: 0,
		comeOuts: 0,
		streak: 0,
		currentRun: null,
		currentPointStreak: 0,
		pointStreak: 0,
		loop: null,
		history: null,
		rollDice: function() {

			this.d1 = randomRoll();
			this.d2 = randomRoll();

			total = this.d1 + this.d2;

			this.diceRolls += 1;

			if (this.comeOut == false) {
				this.currentRun += 1;
			}

			this.setMessageView('Player rolls a ' + total);

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
			
			this.currentRun = 1;
			this.rollDice();

			var roll = this.d1 + this.d2;
			
			this.setMessageView('The comeout roll!');
			this.comeOuts += 1;
			
			this.comeOutRollCheck(roll);

		},
		comeOutRollCheck: function(roll) {

			if (roll == 7 || roll == 11 && this.comeOut == true) {

				this.comeOutDiceRoll = roll;
				this.winComeOut();
				this.pushWin();
				this.comeOut = true;
				this.setMessageView('Player rolls a natural.');
				this.currentPointStreak += 1;
				OscarsGrind.updateViews();

			} else if(roll == 2 || roll == 3 || roll == 12) {

				this.comeOut = true;
				this.setMessageView('player craps out with a ' + roll);
				this.clearBet();
				this.pushLose();
				this.currentPointStreak = 0;
				OscarsGrind.updateViews();

			} else {

				this.point = roll;
				this.comeOut = false;
				this.setMessageView('player sets point to ' + this.point);
				OscarsGrind.updateViews();
			}

		},
		bet: {
			passLine: function(units) {
				OscarsGrind.bankroll -= units * OscarsGrind.betSize;
				OscarsGrind.passLine += units * OscarsGrind.betSize;
				OscarsGrind.setBankView();
				OscarsGrind.setMessageView("Player bets: " + OscarsGrind.betUnit * OscarsGrind.betSize);
			}

		},
		clearBet: function() {
			this.passLine = 0;
		},
		winPassLine: function() {

			this.bankroll += (this.betUnit * 2) * this.passLine;
			this.clearBet();
			this.setBankView();
		},
		winComeOut: function() {

			this.bankroll += (this.betUnit * 2) * this.betSize;
			this.clearBet();
			this.setBankView();
		},
		pushWin: function() {
			history.push(1);
			console.log("pushing win");
		},
		pushLose: function() {
			history.push(0);
			console.log("pushing lost");
		},
		setBetUnit: function(_betunit) {

			this.betUnit = _betunit;
		},
		setDiceView: function() {

		 	var template = $('#template-dice').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, {dice1: this.d1, dice2: this.d2});
		 	$('#dice').html(rendered);
		},
		setBankView: function() {

		 	var template = $('#template-bank').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, {bankroll: this.bankroll, bankunit: this.betUnit, betsize: this.betSize, currentbet: this.passLine });
		 	$('#bank').html(rendered);


		},
		setPointView: function() {

		 	var template = $('#template-point').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, {point: this.point });
		 	$('#point').html(rendered);


		},
		setMessageView: function(_message) {

		 	var template = $('#template-messages').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, {message: _message });
		 	$('#messages').html(rendered);

		},
		setStatsView: function() {

		 	var template = $('#template-stats').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, { 
		 		comeouts: this.comeOuts, 
		 		rolls: this.diceRolls, 
		 		currentRun: this.currentRun, 
		 		currentPointStreak: this.currentPointStreak,
		 		pointStreak: this.pointStreak,
		 	});
		 	$('#stats').html(rendered);


		},
		setDiceHistory: function() {

		 	var template = $('#template-diceHistory').html();
		 	Mustache.parse(template);   // optional, speeds up future uses
		 	var rendered = Mustache.render(template, { 
		 		two: this.diceHistory.two,
		 		three: this.diceHistory.three,
		 		four: this.diceHistory.four,
		 		five: this.diceHistory.five,
		 		six: this.diceHistory.six,
		 		seven: this.diceHistory.seven,
		 		eight: this.diceHistory.eight,
		 		nine: this.diceHistory.nine,
		 		ten: this.diceHistory.ten,
		 		eleven: this.diceHistory.eleven,
		 		twelve: this.diceHistory.twelve
		 	});
		 	$('#diceHistory').html(rendered);


		},
		checkRoll: function() {

			var currentDice = this.d1 + this.d2;
			
			if (currentDice == this.point) {

				this.winPassLine();
				this.pushWin();
				this.comeOut = true;
				this.point = null;
				this.setMessageView('Player hits the point!');
				this.currentPointStreak += 1;
				if (this.currentPointStreak >= this.pointStreak) {
					this.pointStreak = this.currentPointStreak;
				}
			}

			if (currentDice == 7) {

				this.setMessageView('seven out');
				this.pushLose();
				this.clearBet();
				OscarsGrind.comeOut == true;
				//this.bankroll -= this.betUnit * this.betSize;
				this.point = null;
				this.comeOut = true;
				this.currentPointStreak = 0;
			}
		},
		updateViews: function() {
					OscarsGrind.setDiceView();
					OscarsGrind.setBankView();
					OscarsGrind.setPointView();
					OscarsGrind.setDiceHistory();
					OscarsGrind.setStatsView();
		},
		returnHistory: function() {
			return history;
		},
		start: function() {

			OscarsGrind.setBankroll(2000);
			OscarsGrind.setBetUnit(1);
			OscarsGrind.setBetSize(10);
			OscarsGrind.updateViews();
			
			loop = setInterval(function(){
				
				if (OscarsGrind.bankroll <= 0) {
					OscarsGrind.stop();
					OscarsGrind.setMessageView("Bankrupt.");
				}

				if (OscarsGrind.comeOut == true)
				{
					//update views
					OscarsGrind.updateViews();
					OscarsGrind.bet.passLine(5);
					OscarsGrind.comeOutRoll();


				} else {

					//update views

					OscarsGrind.rollDice();
					OscarsGrind.updateViews()
					OscarsGrind.checkRoll();


				}

				
			}, 5000);

		},
		stop: function() {

			clearInterval(loop);

		}



	}

})();


OscarsGrind.start();

