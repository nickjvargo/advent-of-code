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
    let usefulInfo = '';
    for (let i in idRanges) {
        let range = idRanges[i];
        let idEnds = range.split('-');
        // Feel like I should specify the data type I work with rather than let JS do JS things
        let beginningOfRange = Number(idEnds[0]);
        let endOfRange = Number(idEnds[1]);
        let idNumber = beginningOfRange;
        while (idNumber <= endOfRange) {
            let idString = idNumber.toString();
            // Only need to iterate through half the id length; if no match by then, it is not 
            // repeatable by at least two, which is lowest amount
            for (let i = 0; i < idString.length / 2; i++) {
                let charSequence = idString.substring(0,i+1);
                let matches = [...idString.matchAll(charSequence)];
                // If amount of matches * charSequence length = id length, that means entire id is composed of
                // repeating character sequence. Eg, three matches of a two character sequence in a six character id 
                // means that entire id is composed of these matching character sequences.
                // Have to also include matches.length > 1, as repeating necessitates more than one.
                if (matches.length * charSequence.length === idString.length && matches.length > 1) {
                    console.log("Found bad id " + "\x1b[33m" + idNumber + "\x1b[0m" + " in range " + "\x1b[35m" + range + "\x1b[0m" + " sir.");
                    
                    // DEBUG
                    // let badIdFoundString = "Found bad id " + idNumber + " in range " + range + " sir.";
                    // console.log(badIdFoundString);
                    // usefulInfo += badIdFoundString + "\n";

                    console.log("Repeating character sequence is " + "\x1b[33m" + charSequence + "\x1b[0m" + " which repeats " + "\x1b[35m" + matches.length + "\x1b[0m" + " times.");
                    
                    // DEBUG
                    // let repeatingCharacterString = "Repeating character sequence is " + charSequence + " which repeats " + matches.length + " times.";
                    // console.log(repeatingCharacterString);
                    // usefulInfo += repeatingCharacterString + "\n";

                    solution += idNumber;
                    console.log("Adding to solution. Solution is now", solution, ".");

                    // DEBUG
                    // let solutionString = "Adding to solution. Solution is now " + solution + ".";
                    // console.log(solutionString);
                    // usefulInfo += solutionString + "\n";

                    break;
                }
            }
            idNumber++;
        }
    }
    console.log("Finished tabulating. Final answer is " + "\x1b[32m" + solution + "\x1b[0m" + ".");
    // writeIntoFile(usefulInfo);
}


// Used to debug why answer was wrong. Turns out I was matching one char sequences, ie 1 repeats one time in the id 1.
// Resolved by outputting text in seperate file (output.txt) and looking for things that stood out.
// function writeIntoFile(string) {
//     fs.writeFile('2025/day-two/output.txt', string, (err) => {
//         if (err) {
//             console.error('How could this even err??', err);
//             return;
//         }
//     });
// }