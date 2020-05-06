import { routes } from 'svelte-hash-router'

import Home from './pages/Home.svelte';
import Demo from './pages/Demo.svelte';
import Import from './pages/Import.svelte';
import NotFound from './pages/NotFound.svelte';

routes.set({
	'/': {
	  $$component: Home,
	  $$name: 'Home',
	  $$section: 'General'
	}, 
	'/demo': {
		$$component: Demo,
		$$name: 'Demo page',
		$$section: 'General'
	  }, 
	  '/import': {
		$$component: Import,
		$$name: 'Import Data',
		$$section: 'Administration'
	  },

	  '*': {
		// options
		$$component: NotFound,
		$$name: '404',
		$$section: 'none'
	  }

});

export { routes }
