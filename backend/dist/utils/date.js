"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneHourFromNow = exports.ONE_DAY_MS = exports.fiveMinutesAgo = exports.fifteenMinutesFromNow = exports.thirtyDaysFromNow = exports.oneYearFromNow = void 0;
const oneYearFromNow = () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 // ms value
);
exports.oneYearFromNow = oneYearFromNow;
const thirtyDaysFromNow = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
exports.thirtyDaysFromNow = thirtyDaysFromNow;
const fifteenMinutesFromNow = () => new Date(Date.now() + 15 * 60 * 1000);
exports.fifteenMinutesFromNow = fifteenMinutesFromNow;
const fiveMinutesAgo = () => new Date(Date.now() - 5 * 60 * 1000);
exports.fiveMinutesAgo = fiveMinutesAgo;
exports.ONE_DAY_MS = 24 * 60 * 60 * 1000;
const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);
exports.oneHourFromNow = oneHourFromNow;
