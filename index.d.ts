declare const l10nFrench: {
  milliSeconds: [string, string];
  seconds: [string, string];
  minutes: [string, string];
  hours: [string, string];
  days: [string, string];
  weeks: [string, string];
  months: [string, string];
  years: [string, string];
};

export = Elapsed;
declare function Elapsed(from: any, to: any, l10n: any, ...args: any[]): void;
declare namespace Elapsed {
  const l10nFrench: {
    milliSeconds: [string, string];
    seconds: [string, string];
    minutes: [string, string];
    hours: [string, string];
    days: [string, string];
    weeks: [string, string];
    months: [string, string];
    years: [string, string];
  };
}
