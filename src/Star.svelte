<script>
  export let color = "";
</script>

<style>
  .full-star:before {
    color: #d4af37;
    content: "\2605";
    position: relative;
    left: 0;
    bottom: 0;
    overflow: hidden;
    font-size: 2em;
  }

  .silver:before {
    color: silver;
  }

  .bronze:before {
    color: #b08d57;
  }
</style>

<span class="full-star {color}" />
