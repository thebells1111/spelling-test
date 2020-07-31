<script>
  import Star from "./Star.svelte";

  import {
    spellingAttempt,
    index,
    attempts,
    spellingWordStatus,
    spellingWordInput,
    wordList,
    starCount,
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
      hearCorrectWord();
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
    cursor: pointer;
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
    width: 80%;
    border: none;
    outline: none;
    box-sizing: border-box;
    position: relative;
    top: 25%;
    text-align: center;
    background-color: whitesmoke;
  }

  s-instructions {
    display: inline-block;
    font-size: 2em;
    position: relative;
    bottom: 1em;
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

  s-awards {
    position: absolute;
    display: block;
    bottom: 0;
    right: 1em;
  }
</style>

<button on:click={hearCorrectWord}>Hear Spelling Word</button>

<div on:mousedown|preventDefault={() => $spellingWordInput.focus()}>
  <input
    bind:value={$spellingAttempt}
    bind:this={$spellingWordInput}
    readonly={$spellingWordStatus === 'incorrect'} />
  {#if !$spellingAttempt}
    <s-instructions>Type word then press enter</s-instructions>
  {/if}
  {#if $spellingWordStatus === 'incorrect'}
    <button class="hear-incorrect-word" on:click={hearIncorrectWord}>
      <EarIcon size="2em" />
    </button>
  {/if}
  <s-awards>
    <span>
      <Star />
      {$starCount[0]}
    </span>
    <span>
      <Star color="silver" />
      {$starCount[1]}
    </span>
    <Star color="bronze" />
    {$starCount[2]}
  </s-awards>
</div>
<button
  on:click={handleButtonClick}
  class:correct-answer={$spellingWordStatus === 'correct'}
  class:incorrect-answer={$spellingWordStatus === 'incorrect'}>
  {#if $spellingWordStatus === 'incorrect'}
    Try Again! Press Enter
  {:else}Enter{/if}
</button>
