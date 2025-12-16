import ora from 'ora'
import { git } from '../utils/git.js'

export async function push() {
  const spinner = ora('Pushing to origin...').start()
  await git(['push'])
  spinner.succeed('Push complete')
}
