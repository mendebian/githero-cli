import inquirer from 'inquirer'
import { git } from '../utils/git.js'

export async function nuclearMenu() {
  const { confirm } = await inquirer.prompt([
    {
      type: 'input',
      name: 'confirm',
      message: 'Type: I KNOW WHAT I AM DOING'
    }
  ])

  if (confirm === 'I KNOW WHAT I AM DOING') {
    await git(['reset', '--hard'])
    await git(['clean', '-fd'])
  }
}
