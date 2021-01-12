<script>

	import sha256 from 'js-sha256';

	let siblings = 0;
	const year = new Date().getFullYear();
	let age = year;
	let hair = "";

	function updateAge() {
		age = this.value;
	}

	function updateSib() {
		siblings = this.value;
	}

	function updateHair() {
		hair = this.value;
	}

	$:digest = sha256(JSON.stringify({
		birthday: age,
		nos: siblings,
		hairColor: hair,
	}));

</script>

<main>
	<h1>HUUID</h1>
	<h2>Your HUman Unique IDentifier</h2>
	<br>
	<form action="">
		<label for="dob">Date of birth:<input type="date" id="dob" name="bday"
			min="1900-01-01" max="{new Date().getTime()}" on:change={updateAge}>
		</label>
		<br>
		<label for="siblings">Number of siblings:<input id="siblings" type="number" on:change={updateSib} value="{siblings}" min="0" /></label>
			<label for="hair"> Your hair color: 
				<!-- svelte-ignore a11y-no-onchange -->
				<select name="hair" id="hair" on:change={updateHair} value="{hair}">
					<option value="brown">Brown</option>
					<option value="blond">Blond</option>
					<option value="black">Black</option>
					<option value="auburn">Auburn</option>
					<option value="red">Red</option>
					<option value="grayorwhite">Gray and/or white</option>
			</select>
		</label>
	</form>
	<br>
	<span>Your HUUID: {digest}</span> <br>
	<span>Calculated from: 
		{JSON.stringify({
			birthday: age,
			nos: siblings,
			hairColor: hair,
		})}
	</span>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>