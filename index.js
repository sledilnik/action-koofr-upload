const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const Koofr = require('koofr');
const path = require('path');

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
        const fileName = path.basename(localPath);
        const file = fs.readFileSync(localPath);
        await uploadFile(mountId, remotePath, fileName, file);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main()
