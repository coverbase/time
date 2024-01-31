import {
    addDays,
    addHours,
    addMinutes,
    addMonths,
    startOfDay,
    startOfHour,
    startOfMinute,
    startOfMonth,
} from "./date";
import { units, type Unit } from "./unit";
import { flatten, range, toNumber } from "./utils";

export const nextSchedule = (date: Date, interval: string) => {
    const parts = interval.split(" ");

    if (parts.length === 5) {
        const [minutes, hours, daysOfMonth, months, daysOfWeek] = parts.map((part, index) =>
            toPart(part, units[index]),
        );

        let next = addMinutes(new Date(date), 1);

        next.setSeconds(0);
        next.setMilliseconds(0);

        let retry = 24;

        let monthChanged = false;
        let dayChanged = false;
        let hourChanged = false;

        while (--retry) {
            while (months.indexOf(next.getMonth()) === -1) {
                next = startOfMonth(addMonths(next, 1));
            }

            const currentMonth = next.getMonth();

            while (
                daysOfMonth.indexOf(next.getDate()) === -1 ||
                daysOfWeek.indexOf(next.getDay()) === -1
            ) {
                next = startOfDay(addDays(next, 1));

                if (currentMonth !== next.getMonth()) {
                    monthChanged = true;
                    break;
                }
            }

            if (!monthChanged) {
                const currentDay = next.getDate();

                while (hours.indexOf(next.getHours()) === -1) {
                    next = startOfHour(addHours(next, 1));

                    if (currentDay !== next.getDate()) {
                        dayChanged = true;
                        break;
                    }
                }

                if (!dayChanged) {
                    const currentHour = next.getHours();

                    while (minutes.indexOf(next.getMinutes()) === -1) {
                        next = startOfMinute(addMinutes(next, 1));

                        if (currentHour !== next.getHours()) {
                            hourChanged = true;
                            break;
                        }
                    }

                    if (!hourChanged) {
                        break;
                    }
                }
            }
        }

        next.setSeconds(0);
        next.setMilliseconds(0);

        return next;
    }
};

export const toPart = (part: string, unit: Unit) => {
    const values = part.split(",").map((value) => {
        const values = value.split("/");

        if (values.length > 2) {
            throw new Error(`Invalid value "${part}"`);
        }

        let parsedValues: Array<number>;

        const left = values[0];
        const right = values[1];

        if (left === "*") {
            parsedValues = range(unit.min, unit.max);
        } else {
            parsedValues = toRange(left);
        }

        const step = toStep(right);

        return toInterval(parsedValues, step);
    });

    return [...new Set(flatten(values))].sort((a, b) => a - b);
};

export const toRange = (rangeValue: string) => {
    const parts = rangeValue.split("-");

    if (parts.length === 1) {
        const value = toNumber(parts[0]);

        if (value === undefined) {
            throw new Error(`Invalid value`);
        }

        return [value];
    } else if (parts.length === 2) {
        const min = toNumber(parts[0]);
        const max = toNumber(parts[1]);

        if (min === undefined || max === undefined) {
            throw new Error(`Invalid value`);
        }

        if (max < min) {
            throw new Error(`Max range is less than min range in "${rangeValue}"`);
        }

        return range(min, max);
    } else {
        throw new Error(`Invalid value "${rangeValue}"`);
    }
};

export const toStep = (step: string | undefined) => {
    if (step) {
        const parsedStep = toNumber(step);

        if (parsedStep === undefined) {
            throw new Error(`Invalid interval step value "${step}"`);
        }

        return parsedStep;
    }

    return 0;
};

export const toInterval = (values: Array<number>, step: number) => {
    if (step) {
        const min = values[0];

        values = values.filter((value) => value % step === min % step || value === min);
    }

    return values;
};
