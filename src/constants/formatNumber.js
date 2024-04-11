export const formatNumber = (number) => {
	if (number === 0) {
		return 'N/A';
	} else if (number >= 1000 && number < 1000000) {
		return (number / 1000).toFixed(1) + 'K';
	} else if (number >= 1000000 && number < 1000000000) {
		return (number / 1000000).toFixed(1) + 'M';
	} else if (number >= 1000000000 && number < 1000000000000) {
		return (number / 1000000000).toFixed(1) + 'B';
	} else if (number >= 1000000000000) {
		return (number / 1000000000000).toFixed(1) + 'T';
	} else {
		return number?.toLocaleString('en-US', { maximumFractionDigits: 1 });
	}
};
