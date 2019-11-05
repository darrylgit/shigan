const fs = require("fs");

// Hours USA is behind South Korea
const standardDifference = 14; // until March 8 2020
const daylightSavingsDifference = 13; // March 8 - Nov 1 2020

// Helper function to generate xx:xx-xx:xxKST, xx:xx-xx:xxEST
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

// Shift outlines
const b = {
  times: generateTimes(13, "30"),
  days: [7, 8, 14]
};

const bb = {
  times: generateTimes(12),
  days: [11]
};

const e = {
  times: generateTimes(10),
  days: [5, 6, 9, 12, 13, 15, 18, 19, 20, 21, 22, 25, 26, 27]
};

const ml = {
  times: "Monthly Leave",
  days: [28]
};

const shifts = [b, bb, e, ml];

// A schedule array and the for loops that push data to it
const schedule = [];

for (let i = 5; i < 31; i++) {
  let dayPushedToSchedule = false;

  for (let j = 0; j < shifts.length; j++) {
    if (shifts[j].days.includes(i)) {
      schedule.push(`${i}일: ${shifts[j].times}`);
      dayPushedToSchedule = true;
      break;
    }
  }

  if (!dayPushedToSchedule) {
    schedule.push(`${i}일: Day Off`);
  }
}

// Join array with newlines, write to file
fs.writeFileSync(`${__dirname}/output.txt`, schedule.join("\n"), "utf-8");
