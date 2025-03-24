#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';

const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const CURR_DIR = process.cwd();
const QUESTIONS: any = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input: any) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];

inquirer.prompt(QUESTIONS).then((ans) => {
  const projectChoice = ans['project-choice'];
  const projectName = ans['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  createDirectoryContents(templatePath, projectName);
});

function createDirectoryContents(templatePath: any, newProjectPath: any) {
  const fileToCreate = fs.readdirSync(templatePath);

  fileToCreate.forEach((file) => {
    const ogFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(ogFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(ogFilePath, 'utf8');
      if (file === '.npmignore') file = '.gitignore';
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    }else if(stats.isDirectory()){
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);


      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      )
    }
  });
}
