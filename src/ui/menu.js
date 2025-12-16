import inquirer from 'inquirer'
import fs from 'fs'
import { getRepoState } from '../core/state.js'
import { git } from '../utils/git.js'
import { commit } from '../actions/commit.js'
import { push } from '../actions/push.js'
import { pull } from '../actions/pull.js'
import { branchMenu } from '../actions/branch.js'
import { stashMenu } from '../actions/stash.js'
import { logMenu } from '../actions/log.js'
import { clean } from '../actions/clean.js'
import { nuclearMenu } from '../actions/nuclear.js'

export async function mainMenu() {
  const state = await getRepoState()

  // 🆕 Auto init + branch + gitignore
  if (!state.initialized) {
    const { init } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'init',
        message: 'No Git repository detected. Initialize Git here?',
        default: true
      }
    ])

    if (!init) return

    await git(['init'])
    await git(['branch', '-M', 'main'])

    if (!fs.existsSync('.gitignore')) {
      fs.writeFileSync(
        '.gitignore',
        `node_modules
.env
dist
.DS_Store
`
      )
    }

    return mainMenu()
  }

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `Branch: ${state.branch} | ${state.files.length} changes`,
      choices: [
        'Commit changes',
        'Push',
        'Pull (rebase)',
        'Switch / Create branch',
        'Stash changes',
        'View history',
        'Cleanup repo',
        'Nuclear options ☢',
        'Exit'
      ]
    }
  ])

  const map = {
    'Commit changes': commit,
    'Push': push,
    'Pull (rebase)': pull,
    'Switch / Create branch': branchMenu,
    'Stash changes': stashMenu,
    'View history': logMenu,
    'Cleanup repo': clean,
    'Nuclear options ☢': nuclearMenu
  }

  if (map[action]) {
    await map[action]()
    return mainMenu()
  }
}
