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

  function handleButtonClick(){
    if ($spellingWordStatus === 'correct') {
      selectNextWord()
    } else if ($spellingWordStatus === 'incorrect') {
      $spellingWordStatus="";
      $spellingAttempt="";
    } else {
      checkSpelling()
    }

  }
</script>

<style>

  button {
    font-size: 2em;
    flex: 0 1 5rem;
    z-index:9999;
    background-color: #073b4c;
    color: whitesmoke;
    border: none;
  }

  button:active{

  }

  button:first-of-type{
    border-radius: 10px 10px 0 0;
  }

  button:last-of-type{
    border-radius: 0 0 10px 10px;
  }

  .correct-answer{
    font-size: 1.5em;
  }

  .incorrect-answer{
    background-color: #ffd166;
    color:darkslategray;
  }

  input {
    width: 100%;
    text-align: center;
    flex: 1 1 auto;
    border: none;
    font-size: 3em;
    caret-color: transparent;
    outline: none;
    padding: 0;
    position: relative;
    bottom: 15%;
    background-color: transparent;
  }

  ::placeholder{
    font-size: 2rem;
  }

  .hear-incorrect-word{
    position: absolute;
    transform: translate(-50%, -50%);
    top: 65%;
    left: 50%;
    background-color: #06d6a0;
    color: whitesmoke;
    border: none;
    border-radius: 3px;
  }
</style>

<button on:click={hearCorrectWord}>Hear Spelling Word</button>

<input
  bind:value={$spellingAttempt}
  bind:this={$spellingWordInput}
  placeholder="Type word then press enter"
/>
{#if $spellingWordStatus === 'incorrect'}
  <button class="hear-incorrect-word" on:click={hearIncorrectWord}>Hear The Word You Spelled</button>
{/if}
<button
  on:click={handleButtonClick}
  class:correct-answer={$spellingWordStatus === 'correct'}
  class:incorrect-answer={$spellingWordStatus === 'incorrect'}
  >
  {#if $spellingWordStatus === 'correct'}
    Correct! Press Enter to Continue
  {:else if $spellingWordStatus === 'incorrect'}
    Try Again! Press Enter
  {:else}
    Enter
  {/if}
</button>
