const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const Koofr = require('koofr');
const path = require('path');
const glob = require('@actions/glob');

// action variables
const baseUrl = core.getInput('baseUrl');
const username = core.getInput('username');
const password = core.getInput('appPassword');
const mountId = core.getInput('mountId');
const localPath = core.getInput('localPath');
const remotePath = core.getInput('remotePath');

const client = new Koofr(baseUrl);

async function uploadFile(mountId, pth, name, data) {
    try {
        console.log("Uploading to", mountId, pth, name);
        await client.authenticate(username, password);
    } catch (ex) {
        throw new Error(`Authentication failed: ${ex.statusCode} ${ex.statusMessage}`);
    }

    try {
        const ret = await client.filesPut(mountId, pth, name, data);
        core.setOutput("name", ret.name);
    } catch (ex) {
        throw new Error(`Upload failed: ${ex.statusCode} ${ex.statusMessage}`);
    }
}

async function main() {
    try {
        const globber = await glob.create(localPath)
        const files = await globber.glob()

        files.forEach(async function (filePath) {
            const fileName = path.basename(filePath);
            const file = fs.readFileSync(filePath);
            await uploadFile(mountId, remotePath, fileName, file);
        })
    } catch (error) {
        core.setFailed(error.message);
    }
}

main()
