class Trie{

    constructor(value = ""){
        this.value = value; //Character stored in this node
        this.children = {}; //Object containing child nodes
        this.endOfWord = false; //Boolean flag marking complete words
    }

    addWord(word){
        const letter = word.slice(0,1);
        if(word==="")
            this.endOfWord = true;
        else{
            if(!this.children[letter])
            {
                this.children[letter] = new Trie(letter);
                this.children[letter].addWord(word.slice(1));
            }
            else{
                this.children[letter].addWord(word.slice(1));
            }
        }
    }

    findWord(word){
        if(word === "" && this.endOfWord === true){
            return true;
        }
        if(this.children[word.slice(0,1)]){
            return(this.children[word.slice(0,1)].findWord(word.slice(1)));
        }
        else{
            return false;
        }

    }

    predictWords(prefix) {
        const allWords = [];

        const firstChar = prefix.charAt(0);
        const childNode = this.children[firstChar];

        if (!childNode) return allWords;

        const lastNode = this._getRemainingTree(prefix.slice(1), childNode);

        if (lastNode) {
            this._allWordsHelper("", lastNode, allWords, prefix.slice(0,-1));
        }

        return allWords;
    }

    _getRemainingTree(prefix, node) {
        if (prefix === "") {
            return node;
        }

        const firstChar = prefix.charAt(0);
        const childNode = node.children[firstChar];

        if (childNode) {
            return this._getRemainingTree(prefix.slice(1), childNode);
        } else {
            return null; // consider throw an error
        }
    }

    _allWordsHelper(prefix, node, allWords = [], currentWord = "") {
        if (node.value !== undefined) {
            currentWord += node.value;
        }

        if (prefix.length === 0) {
            if (node.endOfWord) {
                allWords.push(currentWord);
            }

            for (let key in node.children) {
                this._allWordsHelper("", node.children[key], allWords, currentWord);
            }

            return allWords;
        }

        const firstChar = prefix[0];
        if (node.children[firstChar]) {
            return this._allWordsHelper(prefix.slice(1), node.children[firstChar], allWords, currentWord);
        } else {
            return allWords;
        }
    }
}
module.exports = Trie;


