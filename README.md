# Koofr upload action

This action uploads artefact to Koofr cloud storage (https://koofr.eu). 

## Inputs

### `baseUrl`

Base URL of Koofr server. Defaults to https://app.koofr.net

### `username`

Account username

### `appPassword`

App password for account. More here https://koofr.eu/help/linking-koofr-with-desktops/how-to-generate-an-application-specific-password-in-koofr/

### `mountId`

Mount ID to upload. Defaults to `primary` which should be OK for most cases.

### `remotePath`

Remote path (path on Koofr) where to put artefact

### `localPath`

Local path of artefact to upload

## Outputs

### `name`

Name of uploaded file

## Example usage

```
- name: Upload test file
uses: sledilnik/action-koofr-upload@v1
with:
    username: info@sledilnik.org
    appPassword: ${{ secrets.KOOFR_PASS }}
    remotePath: /action-koofr-upload
    localPath: testfiles/test.txt
```