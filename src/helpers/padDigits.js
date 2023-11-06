const padDigits = (num, pad) => {
	return num.toString().padStart(pad, '0');
};

module.exports = {
	padDigits,
};
