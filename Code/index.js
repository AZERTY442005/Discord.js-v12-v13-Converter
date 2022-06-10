// ©2022 AZERTY. All rights Reserved | AZERTY#9999
const { converter } = require("v12-to-v13").default;
const fs = require("fs");
var figlet = require("figlet");
const lolcatjs = require("lolcatjs");
const chalk = require("chalk");
const inquirer = require("inquirer");

function Banner() {
    var banner = figlet.textSync("Discord.js v12-v13 Converter", {
        font: "Small",
        horizontalLayout: "default",
        width: 1000,
        whitespaceBreak: true,
    });
    lolcatjs.fromString(banner);
}

console.clear();
Banner();
console.log(chalk.green("\nBy AZERTY442005"));
console.log(chalk.green("https://github.com/AZERTY442005\n"));
console.log(chalk.cyan("Dependancies:"));
console.log(chalk.cyan("https://www.npmjs.com/package/v12-to-v13"));
console.log(chalk.cyan("https://www.npmjs.com/package/figlet"));
console.log(chalk.cyan("https://www.npmjs.com/package/lolcatjs"));
console.log(chalk.cyan("https://www.npmjs.com/package/chalk"));
console.log(chalk.cyan("https://www.npmjs.com/package/inquirer"));
console.log(
    chalk.yellow(
        `\nPut your .js files to Convert into /Input/\nAnd select "Convert"\n`
    )
);

console.log();
// MENU
function Loop() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "Main",
            message: "Select an option",
            choices: ["Convert", "Quit"],
        },
    ])
    .then((answers) => {
        // GETTING CHOICE
        const answer = answers.Main;
        console.clear();
        if (answer !== "Quit") {
            Banner();
            console.log();
        }

        if (answer === "Convert") {
            // CHOICE IS "CONVERT"
            const StartTimestamp = new Date();
            const files = fs.readdirSync("./Input");
            // console.log(files)
            if (files.length === 0) {
                console.log(chalk.red("Folder /Input/ is empty"));
            } else {
                for (const file of files) {
                    console.log(chalk.cyanBright(`Converting ${file} ...`));
                    // GET
                    const content = fs.readFileSync(`./Input/${file}`, "utf8");
                    // CONVERT & WRITE
                    fs.writeFile(
                        `./Output/${file}`,
                        converter(content, false).code,
                        (err) => {
                            if (err) console.error();
                        }
                    );
                    // DELETE
                    fs.unlinkSync(`./Input/${file}`);
                }
                // CONVERT COMPLETE
                const EndTimestamp = new Date();
                var Delay =(EndTimestamp.getTime() - StartTimestamp.getTime()) / 1000;
                console.log(chalk.greenBright(`\nComplete in ${Delay}s !!!`));
                console.log(chalk.yellow("Stored into /Output/"));
            }
        } else if (answer === "Quit") {
            // CHOICE IS "QUIT"
            process.exit();
        }
        console.log("\n\n");
        Loop()

    });
}
Loop()