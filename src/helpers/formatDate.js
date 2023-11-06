const { padDigits } = require('./padDigits');
const PAD = 2;

const getFormatDate = dateString => {
	const date = new Date(dateString * 1);
	return (
		[date.getFullYear(), padDigits(date.getMonth() + 1, PAD), padDigits(date.getDate(), PAD)].join('-') +
		[padDigits(date.getHours(), PAD), padDigits(date.getMinutes(), PAD), padDigits(date.getSeconds(), PAD)]
	);
};

module.exports = {
	getFormatDate,
};
