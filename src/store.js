import { writable, derived } from "svelte/store";
import words from "./wordList.json";

export const count = writable(0);

export let index = writable(0);
export let attempts = writable(0);
export let spellingWordStatus = writable(undefined);
export let spellingWordInput = writable(undefined);
export let spellingAttempt = writable("");
export let msg = writable(undefined);
export let voices = writable(undefined);
export let wordList = writable(words);
export let currentWord = derived(
  [wordList, index],
  ([$wordList, $index]) => $wordList[$index].word
);