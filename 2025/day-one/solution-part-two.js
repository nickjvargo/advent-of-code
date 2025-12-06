const DoublyLinkedList = require('../../data-structures/doubly-linked-list.js');
const Node = require('../../data-structures/node.js');
const fs = require('node:fs');

fs.readFile('2025/day-one/real-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('How could this even err??', err);
        return;
    }
    safeCrackerMethod0x434C49434B(data);
});

function safeCrackerMethod0x434C49434B(input) {
    // Create dial
    const dial = new DoublyLinkedList();
    let dialNumber = 0;
    while (dialNumber !== 100) {
        dial.addNode(new Node(dialNumber));
        dialNumber++;
    }
    // Make a circle
    let tail = dial.getTail();
    tail.next = dial.head;
    dial.head.preceding = tail;

    // Set instructions
    let startingPoint = 50;
    let currentDialNode = dial.getNodeAtIndex(startingPoint);
    console.log("Alright, we are starting at ", currentDialNode.value), ".";
    let actions = input.split(/\n/);
    let amountOfZeroes = 0;
    for (let i = 0; i < actions.length; i++) {
        let direction = actions[i][0];
        let amount = actions[i].replace(/[LR]/, '');
        if (direction.match(/L/)) {
            // L = go left, subtract
            console.log("Turning left ", amount, " times.");
            let turns = 0;
            while (turns < amount) {
                currentDialNode = currentDialNode.preceding;
                turns++;
                // Simple since we have doubly linked list. Just had to move if statement to within while loop
                if (currentDialNode.value === 0) {
                    amountOfZeroes++;
                    console.log("Here we go--passed zero. Total is now ", amountOfZeroes, ".");
                }
            }
            console.log("Dial number is now ", currentDialNode.value, ".");
        } else {
            // R = go right, add
            console.log("Turning right ", amount, " times")
            let turns = 0;
            while (turns < amount) {
                currentDialNode = currentDialNode.next;
                turns++;
                // See explanation in L turning loop.
                if (currentDialNode.value === 0) {
                    amountOfZeroes++;
                    console.log("Passing zero. Total count is ", amountOfZeroes, ".");
                }
            }
            console.log("Dial number is now ", currentDialNode.value, ".");
        }
    }
    console.log("Did it boss. Found ", amountOfZeroes, "clicks. Good thing we started with a doubly linked list!");
}