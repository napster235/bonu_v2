/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGE_JSON_PATH = path.resolve(__dirname, '..', 'package.json');
const ROOT_PATH = path.resolve(__dirname, '..');
const VENDOR_PATH = path.resolve(ROOT_PATH, 'vendor');
// redirect sync output to terminal and make sure it is executed in root
const SYNC_OPTIONS = { stdio: [0, 1, 2], cwd: ROOT_PATH };

const error = (message) => console.log('\n\x1b[31m%s\x1b[0m', `${message}`);
const warn = (message) => console.log('\n\x1b[33m%s\x1b[0m', `${message}`);
const success = (message) => console.log('\n\x1b[32m%s\x1b[0m', `${message}`);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUserInput = (question) => {
  return new Promise((resolve) => {
    readline.question(question, (input) => {
      resolve(input);
      readline.close();
    });
  });
};

const writeJSON = (filePath, obj) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
  } catch (err) {
    error(`there was a problem writing to ${filePath}`);
    error(err);
    process.exit();
  }
};

const readJSON = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    error(`there was a problem writing to ${filePath}`);
    error(err);
    process.exit();
  }
  return {};
};

const read = (filePath, options = 'utf8') => {
  let text = '';
  try {
    text = fs.readFileSync(filePath, options);
  } catch (err) {
    error(`there was a problem reading from ${filePath}`);
    error(err);
    process.exit();
  }
  return text;
};

const write = (filePath, str) => {
  try {
    fs.writeFileSync(filePath, str, { flag: 'w' });
  } catch (err) {
    error(`there was a problem writing to ${filePath}`);
    error(err);
    process.exit();
  }
};

// eslint-disable-next-line no-shadow
const fileExists = (path) => {
  try {
    fs.existsSync(path);
  } catch (err) {
    return false;
  }
  return true;
};

const mergePackageJSON = (newPackageJSON) => {
  success(`Adding new ${Object.keys(newPackageJSON)} to package.json...`);

  let packageJSON = readJSON(PACKAGE_JSON_PATH);

  const changes = Object.keys(newPackageJSON).map(key => {
    return {
      [key]: Object.assign({}, packageJSON[key] || {}, newPackageJSON[key]),
    };
  });

  packageJSON = Object.assign({}, packageJSON, ...changes);

  writeJSON(PACKAGE_JSON_PATH, packageJSON);

  success('package.json succesfully updated!');
};

const system = (command, options = SYNC_OPTIONS) => {
  execSync(command, options);
};

const gitClone = (repo, currentTag) => {
  const tag = currentTag || 'master';
  const options = '--single-branch --depth 1 -c advice.detachedHead=false';
  success(`Cloning ${repo} at ${tag}`);
  // if this needs to be used for something else parametrize vendor path
  system(`git clone --branch ${tag} ${options} ${repo}`, { stdio: [0, 1, 2], cwd: VENDOR_PATH });
};

module.exports = {
  error,
  warn,
  success,
  getUserInput,
  writeJSON,
  readJSON,
  write,
  read,
  fileExists,
  gitClone,
  system,
  PACKAGE_JSON_PATH,
  VENDOR_PATH,
  ROOT_PATH,
  mergePackageJSON,
};
