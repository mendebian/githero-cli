import { execa } from 'execa'

export async function git(args) {
  return execa('git', args, { stdio: 'inherit' })
}
