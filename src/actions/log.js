import { git } from '../utils/git.js'

export async function logMenu() {
  await git(['log', '--oneline', '--graph', '--decorate', '-20'])
}
