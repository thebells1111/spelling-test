<script>
  import SpellingTest from "./SpellingTest.svelte";
  import Practice from "./Practice.svelte";
  import { onMount, tick } from "svelte";
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

  import {
    hearIncorrectWord,
    hearCorrectWord,
    checkSpelling,
    selectNextWord,
  } from "./util.js";

  onMount(() => {
    $msg = new SpeechSynthesisUtterance();
    $msg.voiceURI = "native";
    $msg.volume = 1; // 0 to 1
    $msg.rate = 0.9; // 0.1 to 10
    $msg.pitch = 1; //0 to 2
    $msg.lang = "en-US";

    window.speechSynthesis.onvoiceschanged = function () {
      $voices = window.speechSynthesis.getVoices();
      $msg.voice = $voices[3];
    };
  });

  function handleKeydown(e) {
    var keycode = e.keyCode;

    if (
      //preventDefault for all but keys listed below
      !(
        (
          (keycode > 64 && keycode < 91) || //a-z A-Z
          keycode === 13 || //enter
          keycode === 9 || //tab
          keycode === 8 || //backspace
          keycode === 46 || //delete
          keycode === 222 || //apostrophe
          (keycode > 36 && keycode < 41)
        ) //arrow keys
      )
    ) {
      e.preventDefault();
    }

    if (
      keycode > 64 &&
      keycode < 91 &&
      document.activeElement !== $spellingWordInput
    ) {
      $spellingWordInput.focus();
    } else if (keycode === 13) {
      if ($spellingWordInput && !$spellingWordStatus) {
        checkSpelling();
      } else if ($spellingWordStatus === "incorrect") {
        $spellingWordStatus = "";
        $spellingAttempt = "";
        $msg.text = $currentWord;
        speechSynthesis.speak($msg);
      } else if ($spellingWordStatus === "correct" || $attempts > 4) {
        selectNextWord();
      }
    } else if (keycode === 32) {
      if (e.ctrlKey) {
        hearIncorrectWord();
      } else {
        hearCorrectWord();
      }
    }
  }
</script>

<style>
  main {
    max-width: 450px;
    max-height: 600px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    position: relative;
    background-color: whitesmoke;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<main>
  {#if $attempts > 4}
    <Practice />
  {:else}
    <SpellingTest />
  {/if}
</main>
