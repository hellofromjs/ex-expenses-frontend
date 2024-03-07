import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default ({ mode }) => {

	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		plugins: [react()],
		resolve: {
			alias: {
				'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/scss'),
			}
		},
		base: '/' + (process.env.VITE_REPO_NAME ?? ''),
	})
}