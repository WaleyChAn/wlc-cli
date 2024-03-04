const ora = require('ora')

/**
 * 延迟函数
 * @param {Number} n 随眠时间
 * @returns
 */

const sleep = (n) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, n)
  })
}

const loading = async (massage, fn, ...args) => {
  const spinner = ora(massage)
  spinner.start()

  try {
    let execResult = await fn(...args)
    spinner.succeed()
    return execResult
  } catch (error) {
    spinner.fail('request fail, reTrying!')
    await sleep(1000)
    return loading(massage, fn, ...args)
  }
}

module.exports = {
  loading,
}
