const path = require('path')
const fs = require('fs-extra')
const Inquirer = require('inquirer')

const loading = require('../lib/util.js')

module.exports = async (projectName, option) => {
  console.log(projectName, option)

  const cwd = process.cwd()
  const targetDir = path.join(cwd, projectName)

  if (fs.existsSync(targetDir)) {
    if (option.force) {
      await fs.remove(targetDir)
    } else {
      let { isOverwrite } = await new Inquirer.prompt([
        {
          name: 'isOverwrite',
          type: 'list',
          massage: 'Target directory exists, Please choose an action.',
          choices: [
            {
              name: 'Overwrite',
              value: true,
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ])

      if (!isOverwrite) {
        console.log('Cancle!')
        return
      } else {
        await loading('Removing...', fs.remove(targetDir), targetDir)
      }
    }
  } else {
  }
}
