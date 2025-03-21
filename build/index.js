"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const CHOICES = fs_1.default.readdirSync(`${__dirname}/templates`);
const CURR_DIR = process.cwd();
const QUESTIONS = [
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
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input))
                return true;
            else
                return 'Project name may only include letters, numbers, underscores and hashes.';
        },
    },
];
inquirer_1.default.prompt(QUESTIONS).then((ans) => {
    console.log(ans);
    const projectChoice = ans['project-choice'];
    const projectName = ans['project-name'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    fs_1.default.mkdirSync(`${CURR_DIR}/${projectName}`);
    createDirectoryContents(templatePath, projectName);
});
function createDirectoryContents(templatePath, newProjectPath) {
    const fileToCreate = fs_1.default.readdirSync(templatePath);
    fileToCreate.forEach((file) => {
        const ogFilePath = `${templatePath}/${file}`;
        const stats = fs_1.default.statSync(ogFilePath);
        if (stats.isFile()) {
            const contents = fs_1.default.readFileSync(ogFilePath, 'utf8');
            if (file === '.npmignore')
                file = '.gitignore';
            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs_1.default.writeFileSync(writePath, contents, 'utf8');
        }
        else if (stats.isDirectory()) {
            fs_1.default.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
}
