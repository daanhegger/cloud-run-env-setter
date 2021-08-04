const { program } = require("commander");
const main = require("./main");

// Use commander to make the program user-friendly
program.version("0.0.1");
program.description("Automatically set the enviroment variables of a cloud run service from a local .env file");
program.requiredOption("-s, --service <service>", "cloud run service where you want to update env variables");
program.requiredOption("-e, --env-file <env-file>", "path to the file containing environment variables");
program.requiredOption("-r, --region <region>", "region where the service is hosted", "europe-west4");
program.parse(process.argv);

const options = program.opts();

console.log(`Reading variables from ${options.envFile} and uploading them to ${options.service} (${options.region})`);

// Run the main program with the supplied input
main(options.envFile, options.service, options.region)
    .catch((e) => {
        console.error(e);
        console.error("An error occurred");
    });