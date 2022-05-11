import { ILookups, IMisc } from '@models';

export function simpleNumber(value: number): string | number {
  const valueNum = Math.abs(Number(value));
  return valueNum >= 1.0e9
    ? (valueNum / 1.0e9) % 1 === 0
      ? valueNum / 1.0e9 + 'B'
      : (valueNum / 1.0e9).toFixed(2)
    : valueNum >= 1.0e6
    ? (valueNum / 1.0e6) % 1 === 0
      ? valueNum / 1.0e6 + 'M'
      : (valueNum / 1.0e6).toFixed(2) + 'M'
    : valueNum >= 1.0e3
    ? (valueNum / 1.0e3) % 1 === 0
      ? valueNum / 1.0e3 + 'K'
      : (valueNum / 1.0e3).toFixed(2) + 'K'
    : valueNum % 1 === 0
    ? valueNum
    : valueNum.toFixed(2);
}

export function addMisc(title: string, details: any) {
  const miscLocal = JSON.parse(localStorage.getItem('misc') || '{}');
  let misc: any = miscLocal ? miscLocal : {};

  misc[title] = details;
  localStorage.setItem('misc', JSON.stringify(misc));
}

export function getMisc(): IMisc {
  return JSON.parse(localStorage.getItem('misc') || '{}');
}

export function addLookups(title: string, details: any) {
  const lookupsLocal = JSON.parse(localStorage.getItem('lookups') || '{}');
  let lookups: any = lookupsLocal ? lookupsLocal : {};

  lookups[title] = details;
  localStorage.setItem('lookups', JSON.stringify(lookups));
}

export function getLookups(): ILookups {
  return JSON.parse(localStorage.getItem('lookups') || '{}');
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes == 0) return '0 bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['byte', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function calculateDurationTime(start: string, end: string): number {
  const timeHourStart = parseTime(start)?.hours;
  const timeHourEnd = parseTime(end)?.hours;

  const timeMinuteStart = parseTime(start)?.minutes;
  const timeMinuteEnd = parseTime(end)?.minutes;

  let hourDiff = timeHourEnd - timeHourStart;
  let minuteDiff = timeMinuteEnd - timeMinuteStart;

  if (hourDiff < 0) {
    hourDiff = 24 + hourDiff;
  }

  if (minuteDiff < 0) {
    minuteDiff = 60 + minuteDiff;
    hourDiff = hourDiff - 1;
  }

  const minuteAvg = (minuteDiff / 60).toFixed(2);
  return hourDiff + +minuteAvg;
}

function parseTime(time: string): any {
  const part = time.match(/(\d+):(\d+)(?: )?(am|pm)?/i) || '';
  const minutes = parseInt(part[2], 10);
  const ap = part[3] ? part[3].toUpperCase() : null;

  let hours = parseInt(part[1], 10);

  if (ap === 'AM' && hours == 12) {
    hours = 0;
  }

  if (ap === 'PM' && hours != 12) {
    hours += 12;
  }

  return { hours, minutes };
}

export function calculateListDays(startDate: string, endDate: string) {
  const day = 1000 * 60 * 60 * 24;
  const dateArray = new Array();
  const diff =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / day;
  for (let i = 0; i <= diff; i++) {
    const xx = new Date(startDate).getTime() + day * i;
    const yy = new Date(xx);

    dateArray.push(
      yy.getFullYear() + '-' + (yy.getMonth() + 1) + '-' + yy.getDate()
    );
  }

  return dateArray;
}

export function urlRegEx(): any {
  return new RegExp(
    '[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}(.[a-z]{2,4})?\b(/[-a-zA-Z0-9@:%_+.~#?&/=]*)?'
  );
}
