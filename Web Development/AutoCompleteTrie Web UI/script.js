class Trie {
    constructor(value = "") {
        this.value = value;
        this.children = {};
        this.endOfWord = false;
        this.frequency = 0;
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

        return allWords.sort((a, b) => b.freq - a.freq);
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

const trie = new Trie();
let wordCount = 0;

const addInput = document.getElementById("addInput");
const addButton = document.getElementById("addButton");
const messageDiv = document.getElementById("message");
const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");
const wordCountSpan = document.getElementById("wordCount");

addButton.addEventListener("click", () => {
    const word = addInput.value.trim().toLowerCase();
    if (word === "") {
        showMessage("✗ Cannot add empty word", "error");
        return;
    }
    if (trie.findWord(word)) {
        showMessage(`✗ "${word}" already exists`, "error");
        return;
    }
    trie.addWord(word);
    wordCount++;
    updateWordCount();
    showMessage(`✓ Added '${word}' to dictionary`, "success");
    addInput.value = "";
});

searchInput.addEventListener("input", () => {
    const prefix = searchInput.value.trim().toLowerCase();
    suggestionsList.innerHTML = "";
    if (prefix === "") return;

    const suggestions = trie.predictWords(prefix);
    suggestions.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.word} (${entry.freq})`;
        li.addEventListener("click", () => {
            const newFreq = trie.useWord(entry.word);
            li.textContent = `${entry.word} (${newFreq})`;
        });
        suggestionsList.appendChild(li);
    });
});

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
    setTimeout(() => {
        messageDiv.className = "hidden";
    }, 3000);
}

function updateWordCount() {
    wordCountSpan.textContent = wordCount;
}
