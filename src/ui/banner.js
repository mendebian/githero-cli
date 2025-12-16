import figlet from 'figlet'
import chalk from 'chalk'
import boxen from 'boxen'

export function showBanner() {
  const title = figlet.textSync('GitHero', { horizontalLayout: 'full' })
  const subtitle = chalk.gray('Be a hero. Not a Git manual.')

  console.log(
    boxen(chalk.cyan(title) + '\n' + subtitle, {
      padding: 1,
      borderColor: 'cyan'
    })
  )
}
