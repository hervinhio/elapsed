import Elapsed, { L10n } from '../index';

const german: L10n = {
  milliSeconds: ['millisekunde', 'n'],
  seconds: ['Sekunde', 'n'],
  minutes: ['Minute', 'n'],
  hours: ['Stunde', 'n'],
  days: ['Tag', 'e'],
  weeks: ['Woche', 'n'],
  months: ['Monat', 'e'],
  years: ['Jahr', 'e'],
};

describe('Elapsed', () => {
  const past = new Date('2020-01-01T00:00:00Z');
  const future = new Date('2020-02-01T00:00:00Z');
  const now = new Date();

  describe('constructor', () => {
    it('accepts Date objects for from and to', () => {
      const e = new Elapsed(past, future);
      expect(e.from.getTime()).toBe(past.getTime());
      expect(e.to.getTime()).toBe(future.getTime());
    });

    it('accepts numeric timestamps for from and to', () => {
      const fromTs = past.getTime();
      const toTs = future.getTime();
      const e = new Elapsed(fromTs, toTs);
      expect(e.from.getTime()).toBe(fromTs);
      expect(e.to.getTime()).toBe(toTs);
    });

    it('defaults to to current date when only from is given', () => {
      const e = new Elapsed(past);
      expect(e.to.getTime()).toBeCloseTo(now.getTime(), -2);
    });

    it('accepts l10n as second argument when to is omitted', () => {
      const e = new Elapsed(past, german);
      expect(e.l10n).toBe(german);
      expect(e.to.getTime()).toBeCloseTo(now.getTime(), -2);
    });

    it('uses default l10n when not provided with two date args', () => {
      const e = new Elapsed(past, future);
      expect(e.l10n).toBeDefined();
      expect(e.milliSeconds.text).toMatch(/millisecond/);
    });

    it('uses custom l10n when provided as third argument', () => {
      const e = new Elapsed(past, future, german);
      expect(e.l10n).toBe(german);
    });

    it('preserves to when all three arguments are provided', () => {
      const e = new Elapsed(past, future, german);
      expect(e.to.getTime()).toBe(future.getTime());
    });

    it('uses default l10n when only from is given', () => {
      const e = new Elapsed(past);
      expect(e.l10n).toBeDefined();
      expect(e.milliSeconds.text).toMatch(/millisecond/);
    });
  });

  describe('elapsedTime calculation', () => {
    it('calculates milliseconds difference', () => {
      const from = new Date('2020-01-01T00:00:00.000Z');
      const to = new Date('2020-01-01T00:00:01.500Z');
      const e = new Elapsed(from, to);
      expect(e.elapsedTime).toBe(1500);
    });

    it('handles zero elapsed time', () => {
      const d = new Date();
      const e = new Elapsed(d, d);
      expect(e.elapsedTime).toBe(0);
    });

    it('handles negative elapsed time (future from, past to)', () => {
      const e = new Elapsed(future, past);
      expect(e.elapsedTime).toBeLessThan(0);
    });
  });

  describe('time units', () => {
    it('calculates seconds correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-01T00:01:00Z');
      const e = new Elapsed(from, to);
      expect(e.seconds.num).toBe(60);
    });

    it('calculates minutes correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-01T01:00:00Z');
      const e = new Elapsed(from, to);
      expect(e.minutes.num).toBe(60);
    });

    it('calculates hours correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-01T05:00:00Z');
      const e = new Elapsed(from, to);
      expect(e.hours.num).toBe(5);
    });

    it('calculates days correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-10T00:00:00Z');
      const e = new Elapsed(from, to);
      expect(e.days.num).toBe(9);
    });

    it('calculates weeks correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-22T00:00:00Z');
      const e = new Elapsed(from, to);
      expect(e.weeks.num).toBe(3);
    });

    it('calculates months correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-04-01T00:00:00Z');
      const e = new Elapsed(from, to);
      expect(e.months.num).toBe(3);
    });

    it('calculates years correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2023-01-01T00:00:00Z');
      const e = new Elapsed(from, to);
      expect(e.years.num).toBe(3);
    });
  });

  describe('text formatting', () => {
    it('formats singular (num === 1) correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-01T00:01:00Z');
      const e = new Elapsed(from, to);
      expect(e.minutes.text).toBe('1 minute');
    });

    it('formats plural (num > 1) correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-01T00:05:00Z');
      const e = new Elapsed(from, to);
      expect(e.minutes.text).toBe('5 minutes');
    });

    it('formats zero (num === 0) with singular form', () => {
      const from = new Date();
      const to = new Date();
      const e = new Elapsed(from, to);
      expect(e.seconds.text).toBe('0 second');
    });

    it('uses localized text correctly', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-01T00:05:00Z');
      const e = new Elapsed(from, to, german);
      expect(e.minutes.text).toBe('5 Minuten');
    });
  });

  describe('optimal property', () => {
    it('returns the largest non-zero unit', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-01T05:30:00Z');
      const e = new Elapsed(from, to);
      expect(e.optimal).toBe(e.hours.text);
    });

    it('returns milliseconds when all units are zero', () => {
      const d = new Date();
      const e = new Elapsed(d, d);
      expect(e.optimal).toBe(e.milliSeconds.text);
    });

    it('returns years when years > 0', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2025-01-01T00:00:00Z');
      const e = new Elapsed(from, to);
      expect(e.optimal).toBe(e.years.text);
    });
  });

  describe('set()', () => {
    it('recalculates all values', () => {
      const from = new Date('2020-01-01T00:00:00Z');
      const to = new Date('2020-01-01T01:00:00Z');
      const e = new Elapsed(from, to);
      expect(e.hours.num).toBe(1);

      (e as any).from = new Date('2020-01-01T00:00:00Z');
      (e as any).to = new Date('2020-01-01T03:00:00Z');
      e.set();
      expect(e.hours.num).toBe(3);
    });

    it('returns this for chaining', () => {
      const e = new Elapsed(past, future);
      const result = e.set();
      expect(result).toBe(e);
    });
  });

  describe('refresh()', () => {
    it('updates to date when called with a date', () => {
      const e = new Elapsed(past, future);
      const newTo = new Date('2025-01-01T00:00:00Z');
      e.refresh(newTo);
      expect(e.to.getTime()).toBe(newTo.getTime());
    });

    it('updates to date when called with a timestamp', () => {
      const e = new Elapsed(past, future);
      const ts = new Date('2025-01-01T00:00:00Z').getTime();
      e.refresh(ts);
      expect(e.to.getTime()).toBe(ts);
    });

    it('defaults to current date when called without arguments', () => {
      const e = new Elapsed(past, future);
      e.refresh();
      expect(e.to.getTime()).toBeCloseTo(now.getTime(), -2);
    });

    it('recalculates values after refresh', () => {
      const e = new Elapsed(past, future);
      const oldHours = e.hours.num;
      e.refresh(new Date('2099-01-01T00:00:00Z'));
      expect(e.hours.num).toBeGreaterThan(oldHours);
    });

    it('returns this for chaining', () => {
      const e = new Elapsed(past, future);
      const result = e.refresh(new Date());
      expect(result).toBe(e);
    });
  });

  describe('from property', () => {
    it('stores from as Date even when number is passed', () => {
      const ts = new Date('2020-06-15T00:00:00Z').getTime();
      const e = new Elapsed(ts);
      expect(e.from).toBeInstanceOf(Date);
      expect(e.from.getTime()).toBe(ts);
    });
  });
});
