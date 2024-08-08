const fs = require('fs')
const path = require('path')

const removeComments = (jsonc) =>
  jsonc
    .replace(/\/\/.*$/gm, '') // single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // multi-line comments

const replaceColors = (template, variables) => {
  let output = template

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, "g")
    output = output.replace(regex, value)
  }

  return output
}

const templatePath = path.join(__dirname, "../templates/genie-theme.jsonc")
const templateJSONString = removeComments(fs.readFileSync(templatePath, "utf8"))
const template = JSON.parse(templateJSONString)

const variables = template.templateVariables
delete template.templateVariables

const templateString = JSON.stringify(template, null, 2)
const themeOutput = replaceColors(templateString, variables)

const outputPath = path.join(__dirname, "../themes/genie-theme.json")
fs.writeFileSync(outputPath, themeOutput)

console.log("Theme built successfully!")
