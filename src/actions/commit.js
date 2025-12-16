import inquirer from 'inquirer'
import ora from 'ora'
import { git } from '../utils/git.js'

export async function commit() {
  const { message } = await inquirer.prompt([
    {
      type: 'input',
      name: 'message',
      message: 'Commit message:',
      validate: m => m.length > 0
    }
  ])

  const spinner = ora('Creating commit...').start()

  await git(['add', '.'])
  await git(['commit', '-m', message])

  spinner.succeed('Commit created')
}

