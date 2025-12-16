import inquirer from 'inquirer'
import { execa } from 'execa'
import { git } from '../utils/git.js'

export async function branchMenu() {
  const { stdout } = await execa('git', ['branch'])
  const branches = stdout.split('\n').map(b => b.replace('*', '').trim())

  const { target } = await inquirer.prompt([
    {
      type: 'list',
      name: 'target',
      message: 'Select branch or create new',
      choices: [...branches, 'Create new branch']
    }
  ])

  if (target === 'Create new branch') {
    const { name } = await inquirer.prompt([{ name: 'name', message: 'Branch name:' }])
    await git(['checkout', '-b', name])
  } else {
    await git(['checkout', target])
  }
}
