const updateNotifier = require("update-notifier");
const faker = require("faker/locale/en_US");
const logSymbols = require("log-symbols");
const ProgressBar = require("progress");
const pkg = require("./package.json");
const chalk = require("chalk");
const fs = require("fs");

// -----------------/ Check npm for package updates /-----------------//
const notifier = updateNotifier({ pkg, shouldNotifyInNpmScript: true });

notifier.notify();

if (notifier.update) {
  console.log(
    `${chalk.blueBright("Update available: ")} ${notifier.update.latest}`
  );
}

// -----------------------/ Generate user data /-----------------------//

// Amount of products to generate data for
let qty = 50;

// File output ["filename.ext"]
const filename = "generated_products.txt";

// Console log icons
const jackedUp = logSymbols.error;
const gravyBaby = logSymbols.success;

// Text colors
const yay = chalk.green;
const YAY = chalk.green.bold;

const nay = chalk.red;
const NAY = chalk.red.bold;

const meh = chalk.gray;
const MEH = chalk.gray.dim;

const say = chalk.blueBright;
const log = console.log;

// Generate data && write output to file
const generateData = async (qty) => {
  let i = 0;

  const bar = new ProgressBar(` :percent [:bar] :current / :eta `, {
    complete: `${YAY("●")}`,
    incomplete: `${MEH("◦")}`,
    total: qty,
    width: [50],
    callback: log(
      yay(chalk.magenta(` 💾 "Your code MIGHT be perfect, BUT....."`))
    ),
  });

  let productCollection = [];

  // Store output
  const writeFile = () => {
    try {
      fs.writeFileSync(filename, productCollection.join("---"), {
        flags: "a", // Append file ( uncomment to disable )
      });
    } catch (error) {
      log(jackedUp, nay(`Error writing data to ${FILE}`, NAY(error)));
    }
  };

  for (i; i <= qty - 1; i++) {
    // Template data output with handlebars
    const productData = faker.fake(`
    
    {{commerce.productName}}
    
    {{commerce.productDescription}}

    {{commerce.product}}

    {{commerce.department}}

    {{commerce.color}}
    
    {{image.image}}

`);
    productCollection.push(productData).toString();
    bar.tick(1);
  }

  // Show success message
  if (bar.complete) {
    log(
      gravyBaby,
      YAY(` Generated random data for ${productCollection.length} products`)
    );
    productCollection.forEach(() => writeFile());
    log(gravyBaby, meh(" Data saved to ", say(`"${filename}"`)));
  }
};
generateData(qty);
