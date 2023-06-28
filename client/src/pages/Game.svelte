<script>
	import Board from '../components/Board.svelte';
	import Navbar from '../components/Navbar.svelte';
	import PlayerControl from '../components/PlayerControl.svelte';
	import OpponentControl from '../components/OpponentControl.svelte';
</script>

<Navbar/>

<div class="wrapper">
	<PlayerControl />
	<Board />
	<OpponentControl />
</div>

<style>
	.wrapper {
		width: 100vw;
		height: 100vh;
        box-sizing: border-box;
		
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		grid-template-rows: none;
		place-items: center;
	}
</style>