class Trie {
    constructor(value = "") {
        this.value = value;
        this.children = {};
        this.endOfWord = false;
        this.frequency = 0; //extension
    }

    addWord(word) {
        if (word === "") {
            this.endOfWord = true;
            return;
        }

        const letter = word[0];
        if (!this.children[letter]) {
            this.children[letter] = new Trie(letter);
        }
        this.children[letter].addWord(word.slice(1));
    }

    findNode(word) {
        if (word === "") return this;
        const letter = word[0];
        if (!this.children[letter]) return null;
        return this.children[letter].findNode(word.slice(1));
    }

    findWord(word) {
        const node = this.findNode(word);
        return node !== null && node.endOfWord === true;
    }

    useWord(word) {
        const node = this.findNode(word);
        if (node && node.endOfWord) {
            node.frequency++;
            return node.frequency;
        } else {
            throw new Error(`"${word}" does not exist in dictionary`);
        }
    }

    predictWords(prefix) {
        const allWords = [];

        const firstChar = prefix.charAt(0);
        const childNode = this.children[firstChar];
        if (!childNode) return [];

        const lastNode = this._getRemainingTree(prefix.slice(1), childNode);
        if (!lastNode) return [];

        this._collectWords(prefix.slice(0, -1), lastNode, allWords, "");

        return allWords
            .sort((a, b) => b.freq - a.freq)
            .map(entry => `${entry.word} (${entry.freq})`);
    }

    _getRemainingTree(prefix, node) {
        if (prefix === "") return node;
        const firstChar = prefix[0];
        if (!node.children[firstChar]) return null;
        return this._getRemainingTree(prefix.slice(1), node.children[firstChar]);
    }

    _collectWords(base, node, result, current = "") {
        current += node.value;
        if (node.endOfWord) {
            result.push({ word: base + current, freq: node.frequency });
        }

        for (let key in node.children) {
            this._collectWords(base, node.children[key], result, current);
        }
    }
}

module.exports = Trie;
