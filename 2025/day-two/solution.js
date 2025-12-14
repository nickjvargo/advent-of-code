const fs = require('node:fs');

fs.readFile('2025/day-two/real-input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('How could this even err??', err);
    return;
  }
  invalidIDFinder(data);
});

function invalidIDFinder(input) {
    const idRanges = input.split(',');
    let solution = 0;
    for (let i in idRanges) {
        let range = idRanges[i];
        let idEnds = range.split('-');
        // Feel like I should specify the data type I work with rather than let JS do JS things
        let beginningOfRange = Number(idEnds[0]);
        let endOfRange = Number(idEnds[1]);
        let idNumber = beginningOfRange;
        while (idNumber <= endOfRange) {
            let idString = idNumber.toString();
            // Matches can only be some sequence of digits
            // repeated twice; ie, only numbers with even char length
            if (idString.length % 2 === 0) {
                let beginningHalf = idString.substring(0, idString.length / 2);
                let endHalf = idString.substring(idString.length / 2, idString.length);
                if (beginningHalf === endHalf) {
                    solution += idNumber;
                    console.log("Found bad id " + "\x1b[33m" + idNumber + "\x1b[0m" + " in range " + "\x1b[35m" + range + "\x1b[0m" + " sir.");
                    console.log("Adding to solution. Solution is now", solution, ".");
                }
            }
            idNumber++;
        }
    }
    console.log("Finished tabulating. Final answer is " + "\x1b[32m" + solution + "\x1b[0m" + ".");
}