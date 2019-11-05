const fs = require("fs");

const standardDifference = 14;
const daylightSavingsDifference = 13;

const generateTimes = (
  startHourKst,
  minutes = "00",
  hoursBehindKst = standardDifference
) => {
  const endHourKst = (startHourKst + 9) % 24;
  const startHourEst = (startHourKst - hoursBehindKst + 24) % 24;
  const endHourEst = (startHourEst + 9) % 24;

  let minutesArg = minutes;
  function timeStamp(hour, min = minutesArg) {
    return `${hour}:${min}`;
  }

  const startTimeKst = timeStamp(startHourKst);
  const endTimeKst = timeStamp(endHourKst);
  const startTimeEst = timeStamp(startHourEst);
  const endTimeEst = timeStamp(endHourEst);

  return `${startTimeKst}-${endTimeKst}KST, ${startTimeEst}-${endTimeEst}EST`;
};

const b = generateTimes(13, "30");
const e = generateTimes(10);
const bb = generateTimes(12);

const bDays = [7, 8, 14];
const eDays = [5, 6, 9, 12, 13, 15, 18, 19, 20, 21, 22, 25, 26, 27];
const bbDays = [11];

const mlDays = [28];

const schedule = [];

for (let i = 5; i < 31; i++) {
  if (bDays.includes(i)) {
    schedule.push(`${i}일: ${b}`);
  } else if (eDays.includes(i)) {
    schedule.push(`${i}일: ${e}`);
  } else if (bbDays.includes(i)) {
    schedule.push(`${i}일: ${bb}`);
  } else if (mlDays.includes(i)) {
    schedule.push(`${i}일: ML`);
  } else {
    schedule.push(`${i}일: DO`);
  }
}

fs.writeFileSync(`${__dirname}/output.txt`, schedule.join("\n"), "utf-8");
