class BSNode {
    constructor(value) {
        this.value = value;
        this.leftChild;
        this.rightChild;
    }

        insertNode(newVal) {
        if (!this.value) {
            this.value = newVal
        }
        else if (newVal > this.value && this.rightChild) {
            this.rightChild.insertNode(newVal)
        }
        else if(newVal <= this.value && this.leftChild) {
            this.leftChild.insertNode(newVal)
        }
        else if (newVal <= this.value) {
            this.leftChild = new BSNode(newVal)
        }
        else {
            this.rightChild = new BSNode(newVal)
        }
    }

    findNode(value){
        if(this.value && this.value === value){
            return true;
        }
        else if(value < this.value && this.leftChild){
            if(this.leftChild.findNode(value))
                return true;
            else{
                return false;
            }
        }
        else if(value > this.value && this.rightChild){
            if(this.rightChild.findNode(value))
                return true;
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    findCommonParent(val1, val2){ 
        if(val1 < this.value && val2 < this.value && this.value){
            return(this.leftChild.findCommonParent(val1, val2));
        }
        else if(val1 > this.value && val2 > this.value && this.value){
            return(this.rightChild.findCommonParent(val1, val2));
        }
        else if(val1 > this.value && val2 < this.value && this.value){
            return this.value;
        }
        else if(val1 < this.value && val2 > this.value && this.value){
            return this.value;
        }
        return('J')
    }

    findMaximum(node) {
        if (!node.rightChild) return node;
        return this.findMaximum(node.rightChild);
    }

     findMaximum(node) {
        while (node.rightChild) {
            node = node.rightChild;
        }
        return node;
    }

    removeNode(root, value) {
        if (!root) return null;

        if (value < root.value) {
            root.leftChild = this.removeNode(root.leftChild, value);
        } else if (value > root.value) {
            root.rightChild = this.removeNode(root.rightChild, value);
        } else {
            // no childern
                if (!root.leftChild && !root.rightChild) {
                return null;
            }

            // only one child (left or right)
            if (!root.leftChild) return root.rightChild;
            if (!root.rightChild) return root.leftChild;

            //both childs - complex case - use helping function findMaximum that finds the max val on the left subtree
            let maxLeft = this.findMaximum(root.leftChild);
            root.value = maxLeft.value;
            root.leftChild = this.removeNode(root.leftChild, maxLeft.value);
        }

        return root;
    }
}

const numbers = [8, 9, 12, 3, 5, 1, 11, 4];
let nodeWithOneChild = new BSNode();
numbers.forEach(n => nodeWithOneChild.insertNode(n));
console.log(nodeWithOneChild.removeNode(nodeWithOneChild, 9)); // will return tree like the first image (the 9 will be deletied) 
    
let nodeWithTwoChildren = new BSNode();
numbers.forEach(n => nodeWithTwoChildren.insertNode(n));
console.log(nodeWithTwoChildren.removeNode(nodeWithTwoChildren, 8)); // will return tree like the second image (the root will be 5) 

