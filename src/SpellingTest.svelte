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
</script>

<style>
  button {
    font-size: 1em;
    flex: 0 1 5em;
  }

  input {
    width: 100%;
    text-align: center;
    flex: 1 1 auto;
  }
</style>

<button on:click={hearCorrectWord}>Hear Word</button>
<input
  bind:value={$spellingAttempt}
  bind:this={$spellingWordInput}
  placeholder="Type word then press enter" />
<button
  on:click={$spellingWordStatus === 'correct' ? selectNextWord : checkSpelling}>
  {#if $spellingWordStatus === 'correct'}
    <p>Correct!</p>
    <p>Press Enter to continue</p>
  {:else}Enter{/if}
</button>

{#if $spellingWordStatus === 'incorrect'}
  <button on:click={hearIncorrectWord}>
    <p>Try Again!</p>
    Click the here or press
    <kbd>Ctrl/Cmd</kbd>
    +
    <kbd>Space</kbd>
    to hear the word you spelled.
  </button>
{/if}
