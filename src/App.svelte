<script lang="ts">
	let siblings = 0;
	const year = new Date().getFullYear();
	let age = year;
	let hair = "";
	let name = "";
	let sex = "";

	function updateSex(): void {
		sex = this.value;
	}

	function updateAge(): void {
		age = this.value;
	}

	function updateSib(): void {
		siblings = this.value;
	}

	function updateHair(): void {
		hair = this.value;
	}

	function updateName() {
		name = this.value;
	}

	$:digest = JSON.stringify({
		birthday: age,
		siblings: siblings,
		hairColor: hair,
		name: name,
		sex: sex,
	});
</script>

<main>
	<h1>HUUID</h1>
	<h2>Your HUman Unique IDentifier</h2>
	<br>
	<form action="">
		<label for="name"> Your first name:
			<input id="name" type="text" on:keyup={updateName}>
		</label>
		<label for="dob">Date of birth:<input type="date" id="dob" name="bday"
			min="1900-01-01" max="{new Date().getTime()}" on:change={updateAge}>
		</label>
		<br>
		<label for="siblings">Number of siblings:<input id="siblings" type="number" on:change={updateSib} value="{siblings}" min="0" /></label>
			<label for="hair"> Your hair color (you were born with): 
				<!-- svelte-ignore a11y-no-onchange -->
				<select name="hair" id="hair" on:change={updateHair} value="{hair}">
					<option disabled selected value> -- select an option -- </option>
					<option value="brown">Brown</option>
					<option value="blond">Blond</option>
					<option value="black">Black</option>
					<option value="auburn">Auburn</option>
					<option value="red">Red</option>
					<option value="grayorwhite">Gray and/or white</option>
			</select>
		</label>
		<br>
		<label for="sex">You sex: 
			<!-- svelte-ignore a11y-no-onchange -->
			<select name="sex" id="sex" on:change={updateSex}>
				<option disabled selected value> -- select an option -- </option>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
		</label>
	</form>
	<br>
	<span>Your HUUID: <br>
		<div class="digest">{digest}</div>	
	</span> <br>
	<span>Calculated from: 
		{JSON.stringify({
			birthday: age,
			siblings,
			hairColor: hair,
			name,
			sex,
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
	
	.digest {
		margin: auto;
		background: gray;
		width: 60rem;
		height: 40px;
		color: white;
		font-size: 1.7rem;
		padding: 20px 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	@media (max-width: 640px) {
		.digest {
				font-size: 1.3rem !important;
				width: 100% !important;
				height: 30px;
				padding: 15px 0;
				overflow-x: auto;
				white-space: nowrap;
		}
	}
</style>