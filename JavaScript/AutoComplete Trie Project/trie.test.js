const Trie = require('./trieClass');

describe('Trie', () => {
    let trie;

    beforeEach(() => {
        trie = new Trie();
    });

    test('should add and find a word', () => {
        trie.addWord('cat');
        expect(trie.findWord('cat')).toBe(true);
    });

    test('should not find a word that was not added', () => {
        trie.addWord('cat');
        expect(trie.findWord('dog')).toBe(false);
    });

    test('should return correct completions for a prefix', () => {
        trie.addWord('car');
        trie.addWord('cat');
        trie.addWord('cart');
        trie.addWord('dog');
        const completions = trie.predictWords('ca');
        expect(completions).toEqual(expect.arrayContaining(['car', 'cat', 'cart']));
        expect(completions).not.toContain('dog');
    });

    test('should return empty array for unknown prefix', () => {
        trie.addWord('hello');
        const completions = trie.predictWords('xyz');
        expect(completions).toEqual([]);
    });

    test('should support finding short and full words', () => {
        trie.addWord('hi');
        trie.addWord('hit');
        expect(trie.findWord('hi')).toBe(true);
        expect(trie.findWord('hit')).toBe(true);
        expect(trie.findWord('h')).toBe(false);
    });

    test('should handle empty trie predictions', () => {
        const completions = trie.predictWords('a');
        expect(completions).toEqual([]);
    });
});