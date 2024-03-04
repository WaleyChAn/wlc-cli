const program = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')
const create = require('../lib/create.js')

program.name('wlc-cli').usage('<command>').version('1.0.0', '-v, --version')

program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f, --froce', 'overwrite target directory if it exists')
  .action((projectName, cmd) => {
    create(projectName, cmd)
  })

program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get', 'get value by key')
  .option('-s, --set', 'set option[key] is value')
  .option('-d, --delete', 'delete option by key')
  .action((value, key) => {
    console.log(value, key)
  })

program.on('--help', () => {
  console.log(
    '\r\n' +
      figlet.textSync('wlc-cli', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      }) +
      chalk.green('\r\nversion: 1.0.0\r\n')
  )
})

program.parse(process.argv)
