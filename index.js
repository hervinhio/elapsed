var l10nDefaults = {
  milliSeconds: ['millisecond', 's']
  , seconds: ['second', 's']
	, minutes: ['minute', 's']
	, hours: ['hour', 's']
	, days: ['day', 's']
	, weeks: ['week', 's']
	, months: ['month', 's']
	, years: ['year', 's']
};

var l10nFrench = {
  milliSeconds: ['milliseconde', 's']
  , seconds: ['seconde', 's']
	, minutes: ['minute', 's']
	, hours: ['heure', 's']
	, days: ['jour', 's']
	, weeks: ['semaine', 's']
	, months: ['mois', '']
	, years: ['année', 's']
};

module.exports = Elapsed;
module.exports.l10nFrench = l10nFrench;
