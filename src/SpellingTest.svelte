<script>
  import {
    spellingAttempt,
    index,
    attempts,
    spellingWordStatus,
    spellingWordInput,
    wordList,
  } from "./store.js";

  import {
    hearIncorrectWord,
    hearCorrectWord,
    checkSpelling,
    selectNextWord,
  } from "./util.js";

  import EarIcon from "./EarIcon.svelte";

  function handleButtonClick() {
    if ($spellingWordStatus === "correct") {
      selectNextWord();
    } else if ($spellingWordStatus === "incorrect") {
      $spellingWordStatus = "";
      $spellingAttempt = "";
    } else {
      checkSpelling();
    }
  }
</script>

<style>
  button {
    font-size: 2em;
    flex: 0 1 5rem;
    z-index: 9999;
    background-color: #073b4c;
    color: whitesmoke;
    border: none;
  }

  button:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  button:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  .correct-answer {
    font-size: 1.5em;
  }

  .incorrect-answer {
    background-color: #ffd166;
    color: darkslategray;
  }

  div {
    width: 100%;
    text-align: center;
    flex: 1 1 auto;
    position: relative;
    background-color: whitesmoke;
  }

  input {
    font-size: 3em;
    caret-color: transparent;
    width: 70%;
    border: none;
    box-sizing: border-box;
    position: relative;
    top: 25%;
    text-align: center;
    background-color: whitesmoke;
  }

  ::placeholder {
    font-size: 2rem;
  }

  .hear-incorrect-word {
    position: absolute;
    top: 25%;
    right: -3%;
    border: none;
    border-radius: 3px;
    background-color: transparent;
  }
</style>

<button on:click={hearCorrectWord}>Hear Spelling Word</button>

<div>
  <input
    bind:value={$spellingAttempt}
    bind:this={$spellingWordInput}
    placeholder="Type word then press enter" />
  {#if $spellingWordStatus === 'incorrect'}
    <button class="hear-incorrect-word" on:click={hearIncorrectWord}>
      <EarIcon size="2em" />
    </button>
  {/if}
</div>
<button
  on:click={handleButtonClick}
  class:correct-answer={$spellingWordStatus === 'correct'}
  class:incorrect-answer={$spellingWordStatus === 'incorrect'}>
  {#if $spellingWordStatus === 'incorrect'}
    Try Again! Press Enter
  {:else}Enter{/if}
</button>
