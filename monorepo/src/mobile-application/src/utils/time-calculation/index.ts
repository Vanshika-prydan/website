export function estimateTimeInHourFromM2 (m2: number): number {
  if (m2 >= 0 && m2 <= 40) return 1.5;
  if (m2 >= 41 && m2 <= 60) return 2;
  if (m2 >= 61 && m2 <= 80) return 2.5;
  if (m2 >= 81 && m2 <= 100) return 3;
  if (m2 >= 101 && m2 <= 120) return 3.5;
  if (m2 >= 121 && m2 <= 145) return 4;
  if (m2 >= 146 && m2 <= 170) return 4.5;
  if (m2 >= 171 && m2 <= 195) return 5;
  if (m2 >= 196 && m2 <= 220) return 5.5;
  if (m2 >= 221 && m2 <= 240) return 6;
  if (m2 >= 241 && m2 <= 260) return 6.5;
  if (m2 >= 261 && m2 <= 280) return 7;
  if (m2 >= 281 && m2 <= 300) return 7.5;

  throw new Error('Out of range');
}

export function hoursToMinutes (hours: number): number {
  return hours * 60;
}

export function addTimeForBathrooms (numberOfBathrooms: number): number {
  const TIME_OF_ONE_BATHROOM = 45;
  switch (numberOfBathrooms) {
    case 1:
      return TIME_OF_ONE_BATHROOM * 1;
    case 2:
      return TIME_OF_ONE_BATHROOM * 2;
    case 3:
      return TIME_OF_ONE_BATHROOM * 3;
    case 4:
      return TIME_OF_ONE_BATHROOM * 4;
    case 5:
      return TIME_OF_ONE_BATHROOM * 5;
    default:
      throw new Error('Out of range');
  }
}

export function estimateTime (m2: number, numberOfBathrooms: number): number {
  return (
    hoursToMinutes(estimateTimeInHourFromM2(m2)) +
    addTimeForBathrooms(numberOfBathrooms)
  );
}

export function minutesToHoursMinuteString (minutes: number): string {
  const h = Math.floor(minutes / 60);

  const min = minutes % 60;

  let str = '';

  if (h > 0) {
    str += `${h.toString()}h`;
  }

  if (h > 0 && min > 0) str += ' och ';

  if (min > 0) {
    str += `${min.toString()}min`;
  }

  return str;
}
