<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
	
	const dispatch = createEventDispatcher();

	onMount(() => {
		if (typeof window !== 'undefined' && siteKey) {
			loadRecaptcha();
		}
	});

	function loadRecaptcha() {
		const script = document.createElement('script');
		script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
		
		script.onload = () => {
			window.grecaptcha.ready(() => {
				executeRecaptcha();
			});
		};
	}

	function executeRecaptcha() {
		window.grecaptcha.execute(siteKey, { action: 'login' }).then((token) => {
			dispatch('verified', { token });
		});
	}

	export function reset() {
		executeRecaptcha();
	}
</script>

<div class="text-xs text-gray-500 mb-2">🛡️ Protected by reCAPTCHA</div>