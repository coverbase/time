export type Unit = {
    name: string;
    min: number;
    max: number;
};

export const units: Array<Unit> = [
    {
        name: "minute",
        min: 0,
        max: 59,
    },
    {
        name: "hour",
        min: 0,
        max: 23,
    },
    {
        name: "day",
        min: 1,
        max: 31,
    },
    {
        name: "month",
        min: 0,
        max: 11,
    },
    {
        name: "weekday",
        min: 0,
        max: 6,
    },
];
