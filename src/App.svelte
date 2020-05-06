<script>
	import { onMount } from 'svelte';
	import Body from './common/Body.svelte';

	import { isLoading } from './stores/ui';

	import { init as ipcInit } from './ipc';
	import 'bulma/css/bulma.css';
	import GlobalStyles from './styles/GlobalStyles.svelte';
	import Topbar from './common/Topbar.svelte';


	// Init IPC comunication with the backend
	ipcInit();

	// LOADING //////////////////////////

	isLoading.set(true);

	const unsubscribe = isLoading.subscribe(value => {
		if(value) console.log('is loading');
		else console.log('is NOT loading');
	});

	onMount(async () => {
		isLoading.set(false);
	});
</script>


<div class="wrapper">
	<Topbar/>
	<Body />
</div>


<style lang="scss">
	.wrapper{
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		overflow: hidden;
	}
</style>