import inquirer from 'inquirer'
import { git } from '../utils/git.js'

export async function stashMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Stash options',
      choices: ['Save', 'Apply', 'Drop all']
    }
  ])

  if (action === 'Save') await git(['stash'])
  if (action === 'Apply') await git(['stash', 'apply'])
  if (action === 'Drop all') await git(['stash', 'clear'])
}
