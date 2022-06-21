// ©2022 AZERTY. All rights Reserved | AZERTY#9999

// Importations
const { converter } = require("v12-to-v13").default
const fs = require("fs")
var figlet = require("figlet")
const lolcatjs = require("lolcatjs")
const chalk = require("chalk")
const inquirer = require("inquirer")

// Display Welcome Title
function Banner() {
    var banner = figlet.textSync("Discord.js v12-v13 Converter", {
        font: "Small",
        horizontalLayout: "default",
        width: 1000,
        whitespaceBreak: true,
    })
    lolcatjs.fromString(banner)
}

console.clear()
Banner()

// Display Informations
console.log(chalk.green("\nBy AZERTY442005"))
console.log(chalk.green("https://github.com/AZERTY442005\n"))
console.log(chalk.cyan("Dependancies:"))
console.log(chalk.cyan("https://www.npmjs.com/package/v12-to-v13"))
console.log(chalk.cyan("https://www.npmjs.com/package/figlet"))
console.log(chalk.cyan("https://www.npmjs.com/package/lolcatjs"))
console.log(chalk.cyan("https://www.npmjs.com/package/chalk"))
console.log(chalk.cyan("https://www.npmjs.com/package/inquirer"))
console.log(
    chalk.yellow(
        `\nPut your .js files to Convert into /Input/\nAnd select "Convert"\n`
    )
)

console.log()

function Loop() {
    // Menu
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

            // Gettings Choice
            const answer = answers.Main
            console.clear()

            // Choice is not "Quit": Display Title
            if (answer !== "Quit") {
                Banner()
                console.log()
            }

            // Choice is "Convert"
            if (answer === "Convert") {

                // Get Start Timestamp
                const StartTimestamp = new Date()
                const files = fs.readdirSync("./Input")

                // If 0 files found
                if (files.length === 0) {
                    console.log(chalk.red("Folder /Input/ is empty"))
                } else { // Else

                    // Fetch files into /Input/
                    for (const file of files) {
                        console.log(chalk.cyanBright(`Converting ${file} ...`))

                        // Get File Content
                        const content = fs.readFileSync(
                            `./Input/${file}`,
                            "utf8"
                        )

                        // Convert & Write directly into /Output/
                        fs.writeFile(
                            `./Output/${file}`,
                            converter(content, false).code,
                            (err) => {
                                if (err) console.error()
                            }
                        )

                        // Delete Old file from /Input/
                        fs.unlinkSync(`./Input/${file}`)
                    }
                    // Get End Timestamp & Calculate Delay
                    const EndTimestamp = new Date()
                    var Delay =
                        (EndTimestamp.getTime() - StartTimestamp.getTime()) /
                        1000
                    console.log(
                        chalk.greenBright(`\nComplete in ${Delay}s !!!`)
                    )
                    console.log(chalk.yellow("Stored into /Output/"))
                }
                
            // Choice is "QUIT": Close
            } else if (answer === "Quit") {
                process.exit()
            }
            
            console.log("\n\n")
            Loop()
        })
}
Loop()
