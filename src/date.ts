export const timeSince = (input: Date) => {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat("en");

    const ranges: Record<string, number> = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1,
    };

    const secondsElapsed = (date.getTime() - Date.now()) / 1000;

    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];

            return formatter.format(Math.round(delta), key as Intl.RelativeTimeFormatUnit);
        }
    }
};

export const addMonths = (date: Date, amount: number): Date => {
    const next = new Date(date);

    const dayOfMonth = next.getDate();

    const endOfDesiredMonth = new Date(next.getTime());
    endOfDesiredMonth.setMonth(next.getMonth() + amount + 1, 0);

    const daysInMonth = endOfDesiredMonth.getDate();

    if (dayOfMonth >= daysInMonth) {
        return endOfDesiredMonth;
    } else {
        next.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    }

    return next;
};

export const addDays = (date: Date, amount: number): Date => {
    const next = new Date(date);

    next.setDate(next.getDate() + amount);

    return next;
};

export const addHours = (date: Date, amount: number): Date => {
    return addMilliseconds(date, amount * 3600000);
};

export const addMinutes = (date: Date, amount: number): Date => {
    return addMilliseconds(date, amount * 60000);
};

export const addSeconds = (date: Date, amount: number): Date => {
    return addMilliseconds(date, amount * 1000);
};

export const addMilliseconds = (date: Date, amount: number): Date => {
    return new Date(date.getTime() + amount);
};

export const startOfMonth = (date: Date) => {
    const next = new Date(date);

    next.setDate(1);
    next.setHours(0, 0, 0, 0);

    return next;
};

export const startOfDay = (date: Date) => {
    const next = new Date(date);

    next.setHours(0, 0, 0, 0);

    return next;
};

export const startOfHour = (date: Date) => {
    const next = new Date(date);

    next.setMinutes(0, 0, 0);

    return next;
};

export const startOfMinute = (date: Date) => {
    const next = new Date(date);

    next.setSeconds(0, 0);

    return next;
};

export const startOfSecond = (date: Date) => {
    const next = new Date(date);

    next.setMilliseconds(0);

    return next;
};
