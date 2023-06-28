<div class="section">
    <img id="logo" src="./Logo.png" alt="">
    <img src="./Chance.png" alt="">
    <div>
        <button class="contrast">Dice Roll</button>
        <button class="contrast">Buy Property</button>
        <button class="contrast">Auction Property</button>
    </div>
    <img src="./CChest.png" alt="">
</div>

<style>
    .section {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: 'banner banner banner';

        border: 1px solid black;
		grid-row: 2 / 11;
		grid-column: 2 / 11;
    }

    #logo {
        grid-area: banner;
        height: 80%;
        width: auto;
    }
</style>