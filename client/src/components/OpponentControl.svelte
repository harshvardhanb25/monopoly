<script>
    let players = [2,3,4,5,6]
</script>

<article>
    {#each players as player}
        <header>
            <h3>Player {player}</h3>
            <h3>Properties:</h3>
        </header>
    {/each}

</article>

<style>
    article {
        width: 100%;
        height: 80%;
        box-sizing: border-box;
        margin: 0;
    }
</style>