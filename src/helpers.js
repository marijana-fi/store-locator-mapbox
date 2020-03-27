export function dateObj(d) {
	// date parser ...
	const parts = d.split(/:|\s/);
	const date = new Date();
	if (parts.pop().toLowerCase() === "pm") parts[0] = +parts[0] + 12;
	date.setHours(+parts.shift());
	date.setMinutes(+parts.shift());
	return date;
}

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	var strTime = hours + ":" + minutes + " " + ampm;
	return strTime;
}
const now = formatAMPM(new Date());
