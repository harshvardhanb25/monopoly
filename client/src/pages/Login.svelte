<main class="container">
	<article class="grid">
		<div>
			<hgroup style="text-align: center;">
				<h1 style="margin-bottom: 1rem">Sign In</h1>
				<h2>Sign In to ApnaPoly</h2>
			</hgroup>
			<form>
				<input type="text" placeholder="Username" required />
				<input type="password" placeholder="Password" required />
				<button type="submit" class="contrast" onclick="event.preventDefault()">Sign In</button>
			</form>
		</div>
	</article>
</main>

<style>
    .container {
        height: 100vh;
        display: grid;
        place-items: center;
    }
</style>