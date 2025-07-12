class UniqueArray {
    constructor() {
        this.items = [];
        this.itemSet = new Set();
    }

    add(item) {
        if (!this.itemSet.has(item)) {
            this.items.push(item);
            this.itemSet.add(item);
        }
    }

    showAll() {
        console.log(this.items);
        return this.items;
    }

    exists(item) {
        return this.itemSet.has(item);
    }

    get(index) {
        return index >= 0 && index < this.items.length ? this.items[index] : -1;
    }
}


const uniqueStuff = new UniqueArray()
uniqueStuff.add("toy")
uniqueStuff.showAll() //prints ["toy"]
uniqueStuff.add("toy")
uniqueStuff.showAll() //prints ["toy"]
uniqueStuff.exists("toy") //returns true
uniqueStuff.add("poster")
uniqueStuff.add("hydrogen")
console.log(uniqueStuff.get(2)) //prints "hydrogen"