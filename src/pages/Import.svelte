
<script>
	import { isLoading } from './../stores/ui';
	import { send } from './../ipc';
	import Activitygrid from './../common/Activitygrid.svelte';

	let users = [];

	let symbol='';
	let date = '';

	let symbols = [];
	let filter_symbols = [];
	let dates = [];
	let account_activity = [];

	const handleTest1Click = async () => {
		alert(await send('test'));
	};

	const handleImportClick = async () => {
		isLoading.set(true);

		const records = await send('account-activity-import');

		alert("Import done.  Imported :" + records + " records.");

		isLoading.set(false);
	};

	const handleGetAllClick = async () => {
		isLoading.set(true);

		const tusers = await send('get-all');
		if (Array.isArray(tusers)) {
			console.log("is array is true");
			console.log(tusers);
			users = tusers;
		} else if (tusers !== null) {
			console.log("Not an array");
			console.log(tusers);
			users = [tusers];
		}

		isLoading.set(false);
	};

	const handleGetAccountData = async () => {
		isLoading.set(true);

		dates = await send('account-activity-dates');
		symbols = await send('account-activity-symbols');
		account_activity = await send('account-activity-all');

		console.log("symbols = ");
		console.log(symbols);
		filter_symbols = symbols;


		isLoading.set(false);
	}

	function dateChanged() {
		let prev = "";
		if (date > "") {
			filter_symbols = symbols.filter( item => {
					if (item.symbol !== prev) {
						return item.activity_date === date;
						prev = item.symbol;
					} else {
						return false;
					}
				});
		} else {
			filter_symbols = symbols.filter( item => {
				if (item.symbol !== prev) {
					prev = item.symbol;
					return true;
				}
				return false;

			}); 
		}
	}
</script>

<button type="button" class="button is-primary is-light" on:click|preventDefault={handleTest1Click}>Test</button>
<button type="button" class="button is-primary is-light" on:click|preventDefault={handleImportClick}>Import Account Data</button>
<button type="button" class="button is-primary is-light" on:click|preventDefault={handleGetAccountData}>Get Account Data</button>


<div class="select">
  <select bind:value={date} on:change={dateChanged}>
    <option value=''>Select date</option>
	{#each dates as date_item}
    <option value={date_item.activity_date}>{date_item.activity_date}</option>
	{/each}
  </select>
</div>

<div class="select">
  <select bind:value={symbol}>
    <option value=''>Select symbol</option>
	{#each filter_symbols as symbol_item}
    <option value={symbol_item.symbol}>{symbol_item.symbol}</option>
	{/each}
  </select>
</div>


{#if (users.length > 0) }
	<ul>
	{#each users as user}
		<li>{user.name}</li>
	{/each}
	</ul>
{:else}
	<div>No records found</div>
{/if}

<Activitygrid {date} {symbol} data={account_activity} />

<style lang="scss">
	button{
		margin-top: 20px;
		border: 1px solid #aaa;
		border-radius: 4px;
		background: #eee;
		padding: 7px 15px;
	}
</style>
