import { execa } from 'execa'

export async function getRepoState() {
  try {
    const { stdout: branch } = await execa('git', ['branch', '--show-current'])
    const { stdout: status } = await execa('git', ['status', '--porcelain'])

    return {
      initialized: true,
      branch,
      files: status.split('\n').filter(Boolean)
    }
  } catch {
    return {
      initialized: false,
      branch: null,
      files: []
    }
  }
}
