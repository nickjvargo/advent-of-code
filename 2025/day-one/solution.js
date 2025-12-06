const fs = require('node:fs');

fs.readFile('2025/day-one/sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('How could this even err??', err);
    return;
  }
  safeCracker(data);
});

function safeCracker(input) {
    const dialStartingPosition = 50;
    const dial = new LinkedList();
    // L = go left, subtract
    // R = go right, add
}

LinkedList