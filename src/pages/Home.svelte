<script>
	import Hello from './../common/Hello.svelte';
</script>


<main>
	<h1>Home</h1>
	<Hello />
</main>

<svelte:head>
	<link rel="stylesheet" type="text/css" href="bulma/css/bulma.css">
</svelte:head>

<style lang="scss">
	main{
		width: 100%;
		padding: 20px;
	}

	h1{
		margin-top: 0;
	}
</style>
