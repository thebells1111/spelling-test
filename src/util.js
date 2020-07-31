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
  starCount,
} from "./store.js";

let $spellingWordStatus;
let $attempts;
let $msg;
let $spellingAttempt;
let $currentWord;
let $starCount;

msg.subscribe((value) => ($msg = value));
spellingAttempt.subscribe((value) => ($spellingAttempt = value));
currentWord.subscribe((value) => ($currentWord = value));
spellingAttempt.subscribe((value) => ($spellingAttempt = value));
attempts.subscribe((value) => ($attempts = value));
spellingWordStatus.subscribe((value) => ($spellingWordStatus = value));
currentWord.subscribe((value) => ($currentWord = value));
starCount.subscribe((value) => ($starCount = value));

export function hearIncorrectWord() {
  $msg.text = $spellingAttempt;
  speechSynthesis.speak($msg);
}

export function hearCorrectWord() {
  $msg.text = $currentWord;
  speechSynthesis.speak($msg);
}

export function checkSpelling() {
  if ($spellingAttempt) {
    if ($spellingAttempt === $currentWord) {
      starCount.update((v) => {
        console.log($attempts);
        v[$attempts]++;
        return v;
      });
      spellingWordStatus.set("correct");
      selectNextWord();
    } else {
      spellingWordStatus.set("incorrect");
      attempts.update((n) => n + 1);
    }
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
