export = Elapsed;
declare namespace Elapsed {
    export { Elapsed, l10nFrench };
}
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
declare const l10nFrench: {
    milliSeconds: string[];
    seconds: string[];
    minutes: string[];
    hours: string[];
    days: string[];
    weeks: string[];
    months: string[];
    years: string[];
};
