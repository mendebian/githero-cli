import ora from 'ora'
import { git } from '../utils/git.js'

export async function pull() {
  const spinner = ora('Pulling with rebase...').start()
  await git(['pull', '--rebase'])
  spinner.succeed('Repo updated')
}
