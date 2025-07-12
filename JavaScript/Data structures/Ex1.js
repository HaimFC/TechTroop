class UniqueArray {
    constructor() {
        this.uniqueArray = {};
        this.reverseMap = {};  
        this.uniqueLength = 0;
    }

    add(item) {
        if (!(item in this.uniqueArray)) {
            this.uniqueArray[item] = this.uniqueLength;
            this.reverseMap[this.uniqueLength] = item;
            this.uniqueLength++;
        }
    }

    showAll() {
        const all = [];
        for (let i = 0; i < this.uniqueLength; i++) {
            all.push(this.reverseMap[i]);
        }
        console.log(all);
    }

    exists(item) {
        return item in this.uniqueArray;
    }

    get(index) {
        return index in this.reverseMap ? this.reverseMap[index] : -1;
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