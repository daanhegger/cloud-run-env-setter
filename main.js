const dotenv = require("dotenv");
const fs = require("fs");
const { exec } = require("child_process");

const main = async (envFilePath, serviceName, region) => {
    // Read the env file supplied by the user
    // and parse its content using a third party parser
    // finally concat all values into a long string
    const envFile = fs.readFileSync(envFilePath);
    const config = dotenv.parse(envFile);
    const envAsText = Object.entries(config).map(([k, v]) => `${k}=${v}`).join(",");

    console.log(envAsText);

    // VALIDATION: check that cloud run service exists
    try {
        const servicesOutput = await runShellCommand("gcloud run services list --platform=managed --format=json");
        const services = JSON.parse(servicesOutput).map(service => service.metadata.name);

        if (!services.includes(serviceName)) {
            console.error("Invalid cloud-run service: does not exists on your project");
            return;
        }
    } catch(e) {
        console.error(e);
        console.error("Error loading the list of all cloud run services on your project");
    }

    // Setting the environment variables
    try {
        const setEnvOutput = await runShellCommand(
            `gcloud run services update ${serviceName} --set-env-vars ${envAsText} --platform=managed --region=${region}`
        );
        console.log(setEnvOutput);
    } catch(e) {
        console.error(e);
        console.error("Error setting the environment variables on the service");
    }
};

module.exports = main;

/**
 * Promisified version of the "exec" command
 * rejects on error or stderror output
 */
const runShellCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(`Error getting services: ${error.message}`);
            }
            if (stderr) {
                console.log(stderr);
            }

            return resolve(stdout);
        });
    });
};