import { tick } from "svelte";

import {
  spellingAttempt,
  index,
  attempts,
  spellingWordStatus,
  spellingWordInput,
  wordList,
  msg,
  voices,
  currentWord,
} from "./store.js";

let $spellingWordStatus;
let $attempts;
let $msg;
let $spellingAttempt;
let $currentWord;

msg.subscribe((value) => ($msg = value));
spellingAttempt.subscribe((value) => ($spellingAttempt = value));
currentWord.subscribe((value) => ($currentWord = value));
spellingAttempt.subscribe((value) => ($spellingAttempt = value));
attempts.subscribe((value) => ($attempts = value));
spellingWordStatus.subscribe((value) => ($spellingWordStatus = value));
currentWord.subscribe((value) => ($currentWord = value));

export function hearIncorrectWord() {
  $msg.text = $spellingAttempt;
  speechSynthesis.speak($msg);
  console.log("incorrect");
}

export function hearCorrectWord() {
  $msg.text = $currentWord;
  speechSynthesis.speak($msg);
  console.log("correct");
}

export function checkSpelling() {
  if ($spellingAttempt === $currentWord) {
    spellingWordStatus.set("correct");
    selectNextWord();
  } else {
    spellingWordStatus.set("incorrect");
    attempts.update((n) => n + 1);
  }
}

export async function selectNextWord() {
  index.update((n) => n + 1);
  spellingWordStatus.set("");
  spellingAttempt.set("");
  attempts.set(0);
  await tick();
  hearCorrectWord();
}
