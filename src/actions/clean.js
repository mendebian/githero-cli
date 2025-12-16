import inquirer from 'inquirer'
import { git } from '../utils/git.js'

export async function clean() {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Delete ALL untracked files?',
      default: false
    }
  ])

  if (confirm) await git(['clean', '-fd'])
}
