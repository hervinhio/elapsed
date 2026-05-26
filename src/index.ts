export type L10nEntry = [string, string];

export interface L10n {
  milliSeconds: L10nEntry;
  seconds: L10nEntry;
  minutes: L10nEntry;
  hours: L10nEntry;
  days: L10nEntry;
  weeks: L10nEntry;
  months: L10nEntry;
  years: L10nEntry;
}

export interface TimeUnit {
  num: number;
  text: string;
}

const l10nDefaults: L10n = {
  milliSeconds: ['millisecond', 's'],
  seconds: ['second', 's'],
  minutes: ['minute', 's'],
  hours: ['hour', 's'],
  days: ['day', 's'],
  weeks: ['week', 's'],
  months: ['month', 's'],
  years: ['year', 's'],
};

function isDateLike(value: unknown): value is Date | number {
  return value instanceof Date || (typeof value === 'number' && !isNaN(value));
}

function toDate(value: Date | number): Date {
  return value instanceof Date ? value : new Date(value);
}

class Elapsed {
  from: Date;
  to: Date;
  l10n: L10n;
  elapsedTime: number;
  milliSeconds: TimeUnit;
  seconds: TimeUnit;
  minutes: TimeUnit;
  hours: TimeUnit;
  days: TimeUnit;
  weeks: TimeUnit;
  months: TimeUnit;
  years: TimeUnit;
  optimal: string;

  constructor(from: Date | number, to?: Date | number | L10n, l10n?: L10n) {
    this.from = toDate(from);

    if (l10n !== undefined) {
      this.to = to !== undefined && isDateLike(to) ? toDate(to) : new Date();
      this.l10n = l10n;
    } else if (to !== undefined && isDateLike(to)) {
      this.to = toDate(to);
      this.l10n = l10nDefaults;
    } else if (to !== undefined) {
      this.to = new Date();
      this.l10n = to as L10n;
    } else {
      this.to = new Date();
      this.l10n = l10nDefaults;
    }

    this.elapsedTime = 0;
    this.milliSeconds = { num: 0, text: '' };
    this.seconds = { num: 0, text: '' };
    this.minutes = { num: 0, text: '' };
    this.hours = { num: 0, text: '' };
    this.days = { num: 0, text: '' };
    this.weeks = { num: 0, text: '' };
    this.months = { num: 0, text: '' };
    this.years = { num: 0, text: '' };
    this.optimal = '';

    this.set();
  }

  set(): this {
    this.elapsedTime = this.to.getTime() - this.from.getTime();

    this.milliSeconds = { num: this.elapsedTime, text: '' };
    let divider = 1000;
    this.seconds = { num: Math.floor(this.elapsedTime / divider), text: '' };
    divider *= 60;
    this.minutes = { num: Math.floor(this.elapsedTime / divider), text: '' };
    divider *= 60;
    this.hours = { num: Math.floor(this.elapsedTime / divider), text: '' };
    divider *= 24;
    this.days = { num: Math.floor(this.elapsedTime / divider), text: '' };
    divider *= 7;
    this.weeks = { num: Math.floor(this.elapsedTime / divider), text: '' };
    divider *= 30 / 7;
    this.months = { num: Math.floor(this.elapsedTime / divider), text: '' };
    divider = (divider / (30 / 7) / 7) * 365;
    this.years = { num: Math.floor(this.elapsedTime / divider), text: '' };

    this.milliSeconds.text = this.formatText(this.milliSeconds.num, this.l10n.milliSeconds);
    this.seconds.text = this.formatText(this.seconds.num, this.l10n.seconds);
    this.minutes.text = this.formatText(this.minutes.num, this.l10n.minutes);
    this.hours.text = this.formatText(this.hours.num, this.l10n.hours);
    this.days.text = this.formatText(this.days.num, this.l10n.days);
    this.weeks.text = this.formatText(this.weeks.num, this.l10n.weeks);
    this.months.text = this.formatText(this.months.num, this.l10n.months);
    this.years.text = this.formatText(this.years.num, this.l10n.years);

    if (this.years.num > 0) this.optimal = this.years.text;
    else if (this.months.num > 0) this.optimal = this.months.text;
    else if (this.weeks.num > 0) this.optimal = this.weeks.text;
    else if (this.days.num > 0) this.optimal = this.days.text;
    else if (this.hours.num > 0) this.optimal = this.hours.text;
    else if (this.minutes.num > 0) this.optimal = this.minutes.text;
    else if (this.seconds.num > 0) this.optimal = this.seconds.text;
    else this.optimal = this.milliSeconds.text;

    return this;
  }

  private formatText(num: number, entry: L10nEntry): string {
    return num + ' ' + entry[0] + (num < 2 ? '' : entry[1]);
  }

  refresh(to?: Date | number): this {
    if (to === undefined) {
      this.to = new Date();
    } else {
      this.to = toDate(to);
    }
    return this.set();
  }
}

export default Elapsed;
