<script>
	import { isLoading } from './../stores/ui';
	import { send } from './../ipc';

	let users = [];

	const handleTest1Click = async () => {
		alert(await send('test'));
	};

	const handleTest2Click = async () => {
		isLoading.set(true);

		const user = await send('get-user', { user_id: 1 });

		alert("I'm " + user.name + "!");

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
</script>

Hi<br />

<button type="button" class="button is-primary is-light" on:click|preventDefault={handleTest1Click}>Test</button>
<button type="button" class="button is-primary is-light" on:click|preventDefault={handleTest2Click}>Get my name from the database</button>
<button type="button" class="button is-primary is-light" on:click|preventDefault={handleGetAllClick}>Get All</button>

{#if (users.length > 0) }
	<ul>
	{#each users as user}
		<li>{user.name}</li>
	{/each}
	</ul>
{:else}
	<div>No records found</div>

	
{/if}

<!---
<xstyle lang="scss">
	button{
		margin-top: 20px;
		border: 1px solid #aaa;
		border-radius: 4px;
		background: #eee;
		padding: 7px 15px;
	}
</xstyle>
-->