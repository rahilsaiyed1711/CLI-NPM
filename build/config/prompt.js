"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
const inquirer_1 = __importDefault(require("inquirer"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let proceed = false;
        while (!proceed) {
            console.log(proceed);
            const answers = yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'tech',
                    message: 'Select Technology',
                    choices: ['Node', 'PHP', 'Python'],
                },
                {
                    type: 'list',
                    name: 'DB',
                    message: 'Select Database of your choice',
                    choices: ['SQL', 'mongoDB', 'Postgres'],
                },
                {
                    type: 'list',
                    name: 'confirm',
                    choices: ['Yes', 'No'],
                    message: 'Are you sure you want to continue with this configuration 🚀',
                    when: true,
                },
            ]);
            if (answers.confirm === 'Yes') {
                proceed = true;
                console.log(`all you configuration are: \n Selected Tech 🧑‍💻: ${answers.tech} \n Selected DB 📅: ${answers.DB}`);
            }
            else {
                console.log("Let's start again ◀️.");
            }
        }
    });
}
