export const FILTER_TYPES = {
    EQUAL: 'равно',
    IN: 'в списке',
    NOT_IN: 'не в списке',
    BETWEEN: 'между',
    MORE_THAN: 'более чем',
    MORE_THAN_EQUAL: 'более чем или равно',
    LESS_THAN: 'меньше чем',
    LESS_THAN_EQUAL: 'меньше чем или равно',
    LIKE: 'соответсвие образцу',
};

export const FILTER_TYPES_VALUES = {
    EQUAL: 'EQUAL',
    IN: 'IN',
    NOT_IN: 'NOT_IN',
    BETWEEN: 'BETWEEN',
    MORE_THAN: 'MORE_THAN',
    MORE_THAN_EQUAL: 'MORE_THAN_EQUAL',
    LESS_THAN: 'LESS_THAN',
    LESS_THAN_EQUAL: 'LESS_THAN_EQUAL',
    LIKE: 'LIKE',
};

export const FILTER_TYPES_ARR = [
    {text: FILTER_TYPES.EQUAL, value: FILTER_TYPES_VALUES.EQUAL},
    {text: FILTER_TYPES.IN, value: FILTER_TYPES_VALUES.IN},
    {text: FILTER_TYPES.NOT_IN, value: FILTER_TYPES_VALUES.NOT_IN},
    {text: FILTER_TYPES.BETWEEN, value: FILTER_TYPES_VALUES.BETWEEN},
    {text: FILTER_TYPES.MORE_THAN, value: FILTER_TYPES_VALUES.MORE_THAN},
    {
        text: FILTER_TYPES.MORE_THAN_EQUAL,
        value: FILTER_TYPES_VALUES.MORE_THAN_EQUAL,
    },
    {text: FILTER_TYPES.LESS_THAN, value: FILTER_TYPES_VALUES.LESS_THAN},
    {
        text: FILTER_TYPES.LESS_THAN_EQUAL,
        value: FILTER_TYPES_VALUES.LESS_THAN_EQUAL,
    },
    {text: FILTER_TYPES.LIKE, value: FILTER_TYPES_VALUES.LIKE},
];
