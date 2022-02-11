import {
  addTimeForBathrooms,
  estimateTime,
  estimateTimeInHourFromM2,
  hoursToMinutes,
  minutesToHoursMinuteString,
} from '.';

describe('Time estimation formula', () => {
  it('should return 1,5h for sizes between 0 - 40 m2', () => {
    expect(estimateTimeInHourFromM2(0)).toBe(1.5);
    expect(estimateTimeInHourFromM2(22)).toBe(1.5);
    expect(estimateTimeInHourFromM2(40)).toBe(1.5);
  });
  it('should return 2h for sizes between 41 - 60 m2', () => {
    expect(estimateTimeInHourFromM2(41)).toBe(2);
    expect(estimateTimeInHourFromM2(52)).toBe(2);
    expect(estimateTimeInHourFromM2(60)).toBe(2);
  });
  it('should return 2.5h for sizes between 61-80 m2', () => {
    expect(estimateTimeInHourFromM2(61)).toBe(2.5);
    expect(estimateTimeInHourFromM2(72)).toBe(2.5);
    expect(estimateTimeInHourFromM2(80)).toBe(2.5);
  });
  it('should return 3h for sizes between 81 - 100 m2', () => {
    expect(estimateTimeInHourFromM2(81)).toBe(3);
    expect(estimateTimeInHourFromM2(93)).toBe(3);
    expect(estimateTimeInHourFromM2(100)).toBe(3);
  });
  it('should return 3,5h for sizes between 101 - 120 m2', () => {
    expect(estimateTimeInHourFromM2(101)).toBe(3.5);
    expect(estimateTimeInHourFromM2(103)).toBe(3.5);
    expect(estimateTimeInHourFromM2(120)).toBe(3.5);
  });
  it('should return 4h for sizes between 121 - 145 m2', () => {
    expect(estimateTimeInHourFromM2(121)).toBe(4);
    expect(estimateTimeInHourFromM2(132)).toBe(4);
    expect(estimateTimeInHourFromM2(145)).toBe(4);
  });
  it('should return 4.5h for sizes between 146 - 170 m2', () => {
    expect(estimateTimeInHourFromM2(146)).toBe(4.5);
    expect(estimateTimeInHourFromM2(156)).toBe(4.5);
    expect(estimateTimeInHourFromM2(170)).toBe(4.5);
  });
  it('should return 5h for sizes between 171 - 195 m2', () => {
    expect(estimateTimeInHourFromM2(171)).toBe(5);
    expect(estimateTimeInHourFromM2(184)).toBe(5);
    expect(estimateTimeInHourFromM2(195)).toBe(5);
  });
  it('should return 5.5h for sizes between 196 - 220 m2', () => {
    expect(estimateTimeInHourFromM2(196)).toBe(5.5);
    expect(estimateTimeInHourFromM2(212)).toBe(5.5);
    expect(estimateTimeInHourFromM2(220)).toBe(5.5);
  });
  it('should return 6h for sizes between 221 - 240 m2', () => {
    expect(estimateTimeInHourFromM2(221)).toBe(6);
    expect(estimateTimeInHourFromM2(238)).toBe(6);
    expect(estimateTimeInHourFromM2(240)).toBe(6);
  });
  it('should return 6.5h for sizes between 241 - 260 m2', () => {
    expect(estimateTimeInHourFromM2(241)).toBe(6.5);
    expect(estimateTimeInHourFromM2(242)).toBe(6.5);
    expect(estimateTimeInHourFromM2(260)).toBe(6.5);
  });
  it('should return 7h for sizes between 261 - 280 m2', () => {
    expect(estimateTimeInHourFromM2(261)).toBe(7);
    expect(estimateTimeInHourFromM2(276)).toBe(7);
    expect(estimateTimeInHourFromM2(280)).toBe(7);
  });
  it('should return 7,5h for sizes between 281 - 300 m2', () => {
    expect(estimateTimeInHourFromM2(281)).toBe(7.5);
    expect(estimateTimeInHourFromM2(299)).toBe(7.5);
    expect(estimateTimeInHourFromM2(300)).toBe(7.5);
  });
  it('should throw if it is out of range', () => {
    expect(() => estimateTimeInHourFromM2(301)).toThrowError();
    expect(() => estimateTimeInHourFromM2(-1)).toThrowError();
  });
});

describe('hoursToMinutes', () => {
  it('should return 90 for 1.5', () => {
    expect(hoursToMinutes(1.5)).toBe(90);
  });
  it('should return 120 for 2 hours', () => {
    expect(hoursToMinutes(2)).toBe(120);
  });
});
describe('addTimeForBathrooms', () => {
  it('should add 45 min for one bathroom', () => {
    expect(addTimeForBathrooms(1)).toBe(45);
  });
  it('should add 90 min for two bathroom', () => {
    expect(addTimeForBathrooms(2)).toBe(90);
  });
  it('should add 135 min for three bathroom', () => {
    expect(addTimeForBathrooms(3)).toBe(135);
  });
  it('should throw if it is out of range', () => {
    expect(() => addTimeForBathrooms(-1)).toThrow();
    expect(() => addTimeForBathrooms(6)).toThrow();
  });
});

describe('estimateTime', () => {
  it('should be 4 hours 270 min for 92m2 and 2 bathrooms', () => {
    expect(estimateTime(92, 2)).toBe(270);
  });
});

describe('minutesToHoursMinuteString', () => {
  it('should return 1h for 60 minutes', () => {
    expect(minutesToHoursMinuteString(60)).toBe('1h');
  });
  it('should return 0:30 for 30 minutes', () => {
    expect(minutesToHoursMinuteString(30)).toBe('30min');
  });
  it('should return 2:30 for 150 minutes', () => {
    expect(minutesToHoursMinuteString(150)).toBe('2h och 30min');
  });
  it('should return 5:45 for 345 minutes', () => {
    expect(minutesToHoursMinuteString(345)).toBe('5h och 45min');
  });
});
