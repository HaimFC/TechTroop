const readline = require('readline');
const Trie = require('./trieClass'); 

function mainFunction() {
    console.log("=== AutoComplete Trie Console ===");
    console.log("Type 'help' for commands");
    handleCommand();
}

function handleCommand() {
    const trieWords = new Trie();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        const args = input.trim().split(' ');
        const command = args[0];
        const word = args[1];

        try {
            switch (command) {
                case 'add':
                    if (!word) {
                        throw new Error('✗ Error: "add" command requires a word. Usage: add <word>');
                    }
                    trieWords.addWord(word);
                    console.log(`✓ Added "${word}" to the dictionary.`);
                    break;

                case 'find':
                    if (!word) {
                        throw new Error('✗ Error: "find" command requires a word. Usage: find <word>');
                    }
                    if (trieWords.findWord(word)) {
                        console.log(`✓ "${word}" exists in the dictionary.`);
                    } else {
                        console.log(`✗ "${word}" not found in the dictionary.`);
                    }
                    break;

                case 'complete':
                    if (!word) {
                        throw new Error('✗ Error: "complete" command requires a prefix. Usage: complete <prefix>');
                    }
                    const suggestions = trieWords.predictWords(word);
                    if (suggestions.length > 0) {
                        console.log(`Suggestions for "${word}": ${suggestions.join(', ')}`);
                    } else {
                        console.log(`No completions found for "${word}".`);
                    }
                    break;

                case 'use':
                    if (!trieWords.findWord(word)) {
                        console.log(`✗ "${word}" not found in the dictionary.`);
                    } else {
                        const freq = trieWords.useWord(word);
                        console.log(`✓ Incremented usage for "${word}" (now ${freq})`);
                    }
                    break;

                case 'help':
                    console.log(`
                                Commands:
                                add <word>      - Add word to dictionary
                                find <word>     - Check if word exists
                                complete <prefix> - Get completions
                                help            - Show this message
                                exit            - Quit program
                                `);
                    break;

                case 'exit':
                    console.log("Goodbye!");
                    rl.close();
                    break;

                default:
                    throw new Error(`✗ Error: Unknown command "${command}". Type "help" for a list of commands.`);
            }
        } catch (error) {
            console.error(error.message);
        }
    });
}

module.exports = mainFunction;