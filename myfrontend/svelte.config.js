import { sveltePreprocess } from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH

export default {
  preprocess: sveltePreprocess({sourceMap: !production}),
};
