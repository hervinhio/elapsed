export = Elapsed;
declare function Elapsed(from: any, to: any, l10n: any, ...args: any[]): void;
declare class Elapsed {
    constructor(from: any, to: any, l10n: any, ...args: any[]);
    from: any;
    to: any;
    l10n: any;
    set(): Elapsed;
    elapsedTime: number;
    milliSeconds: {
        num: number;
    };
    seconds: {
        num: number;
    };
    minutes: {
        num: number;
    };
    hours: {
        num: number;
    };
    days: {
        num: number;
    };
    weeks: {
        num: number;
    };
    months: {
        num: number;
    };
    years: {
        num: number;
    };
    optimal: any;
    refresh(to: any): Elapsed;
}
declare namespace Elapsed {
    export const l10nFrench: {
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
