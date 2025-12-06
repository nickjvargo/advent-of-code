class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    addNode(node) {
        this.size++;

        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
            node.preceding = current;
        }
    }

    getNodeAtIndex(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    getTail() {
        let current = this.head;
        if (current) {
            while (current.next) {
                current = current.next
            }
        }
        return current;
    }

}

module.exports = DoublyLinkedList;