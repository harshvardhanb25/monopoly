<script>
    export let id, type, imgPath;
</script>

{#if type == "corner"}
	<img class="corner" src={imgPath} alt="">
{:else}
	<div class="block">{id}</div>
{/if}


<style>	
	.block {
		box-sizing: border-box;
		border: 1px solid black;
	}
	.corner {
		box-sizing: border-box;
		border: 1px solid black;
	}
</style>