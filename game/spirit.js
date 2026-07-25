function Spiritdata() {

	this.spiritnuma = 1;

	this.spiritnamea = [
		"鼠"
	]

	this.spiritcosta = [
		new Decimal("1e180")
	]

	this.buyspirit = function (data, i) {
		return
		data.player.spiritlevela[i] += 1;
	}

}