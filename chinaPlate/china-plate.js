const fs = require('fs')
let config = require('./china-plate.json')
const { prompt, Separator } = require('inquirer')
const exec = require('./exec')
const { push, map } = require('../src/parray')
const { curry, pipe } = require('../src/pcore')

const logData = (param) => {console.log(param); return param}

const buildUserSelection = curry((selectFn, user) => ({name: user.name, value: () => selectFn(user)}))
const buildUserPrompt = curry((message, extraOptions, userFunction, users) =>
  ({
    type: "list",
    name: "user",
    pageSize: 10,
    message,
    choices: pipe(
      map(buildUserSelection(userFunction)),
      push(new Separator()),
      push(...extraOptions)
    )(users)
  })
)
const buildChangePrompt = buildUserPrompt("Please select who's committing",
                          [{ name: "Add Person...", value: addPrompt },
                            { name: "Delete Person...", value: deletePrompt }],
                          changeUser)
const buildDeletePrompt = buildUserPrompt("select a user to DELETE",
                          [{ name: "Return...", value: changePrompt }],
                          deleteUser)

const addUserPrompt = [
  {
    type: "input",
    name: "name",
    message: "User's name",
  },
  {
    type: "input",
    name: "username",
    message: "Git username",
  },
  {
    type: "input",
    name: "email",
    message: "git email address",
  }
]

function deletePrompt() {
  prompt(buildDeletePrompt(config))
    .then((answers) => {
      if (answers && typeof answers.user === "function") {
        answers.user()
      }
    })
}

function changePrompt() {
  prompt(buildChangePrompt(config))
    .then((answers) => {
      if (answers && typeof answers.user === "function") {
        answers.user()
      }
    })
}

function addPrompt() {
  prompt(addUserPrompt)
    .then((answers) => {
      addUser(answers)
    })
}

// const createAddUser = config => user => pipe(push(user), writeFile)

function addUser(user) {
  config = pipe(
    push(user),
    writeFile
  )(config)

  changePrompt()
}

function changeUser({ username, email }) {
  exec('git', ["config", `user.name "${username}"`])
  exec('git', ["config", `user.email "${email}"`])
}

function deleteUser(user) {
  config = config.filter(u => u.username !== user.username)
  writeFile(config)

  changePrompt()
}

function writeFile(objToWrite) {
  fs.writeFile("china-plate.json", JSON.stringify(objToWrite, null, 2), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  })

  return objToWrite
}

changePrompt()