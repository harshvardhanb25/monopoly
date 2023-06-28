<script>
	import Tile from './Tile.svelte';
	import Center from './Center.svelte';

	import {tileData} from '../data/schema.js'
</script>

<div class="board">

	{#each tileData as tile}
		<Tile {...tile}/>
	{/each}

	<Center/>
</div>

<style>
	.board {
		height: 85%;
        aspect-ratio: 1;

		background-color: white;
		border: 1px solid black;
        
		display: grid;
		grid-template-columns: 2fr repeat(9, 1fr) 2fr;
		grid-template-rows: 2fr repeat(9, 1fr) 2fr;
		grid-auto-flow: column;
	}
</style>
