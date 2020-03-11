/**
 * Git pre-commit hook
 * Checks staged files for eslint errors
 * https://cdn-images-1.medium.com/max/1600/1*wjsbeBicpTWF-UHXn19ZbQ.jpeg
 */
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { fileExists } = require('./utils.js');

let config = {
  skipPrecommit: false,
};

try {
  /* eslint global-require: 0 */
  config = require('../precommit-opts.js');
} catch (e) {
  //
}

const CLIENT_DIR_NAME = 'client'; // this may be different based on your project's client folder name

/**
 * Husky pre-commit hooks are run by default from the client folder (or where package.json is).
 * If the client folder is not the root folder of the git repo,
 * the __dirname will end with '/client' or whatever your CLIENT_DIR_NAME constant is.
 * We want GIT_ROOT without the '/client' sufix, if that exists. Below regex does that.
 */
const GIT_ROOT = path.resolve(__dirname, '..').replace(new RegExp(`/${CLIENT_DIR_NAME}$`), '');

// [RegExp]
const EXCLUDE_PATTERNS = [];
const isGitRoot = fileExists(path.resolve(GIT_ROOT, 'precommit-opts.js.sample'));
const excludeString = `| grep -Ev '${EXCLUDE_PATTERNS.join('|')}'`;
/**
 * @param {array} extensions
 * Navigate to the git repo root path, and run git diff command only on allowed files
 * */
const createStagedComand = ({ extensions = ['js', 'jsx', 'vue', 'es6'] } = {}) => {
  return `cd ${GIT_ROOT} && git diff --cached --name-only | ${isGitRoot ? '' : `grep ${CLIENT_DIR_NAME} |`}
    grep -E '\\.(${extensions.join('|')})$' ${EXCLUDE_PATTERNS.length ? excludeString : ''}
  `;
};
/**
 * @param {string} stdoutOutput
 * By default git diff returns a string containing staged files.
 * Each file name is relative to the GIT_ROOT path.
 * Each file is separated by '\n'.
 * */
const createFilesArray = stdoutOutput => {
  const arrayOfFiles = stdoutOutput.split('\n');

  // the last element is always an empty string
  arrayOfFiles.pop();
  return arrayOfFiles;
};

const checkStaged = ({ checkFile, stagedComand, type }) => {
  if (config.skipPrecommit) {
    /* eslint no-console: 0 */
    console.log('\x1b[33m%s\x1b[0m', `...Skiping Precommit hook for ${type}. Check precommit-opts.js for more information!`);
    return true;
  }
  exec(stagedComand, (error, stdout) => {
    if (error !== null) {
      /**
       * Case in which GIT_ROOT doesn't point to a git repo.
       * This will allow the commit to be done anyway.
       */
      return;
    }

    const files = createFilesArray(stdout);

    const errors = files.map(file => {
      /**
       * All files are prefixed with the CLIENT_DIR_NAME/,
       * if client is not the root of the git repository.
       */
      file = `${GIT_ROOT}/${file}`;

      // Case for deleted files
      if (!fs.existsSync(file)) {
        return false;
      }
      return checkFile(file);
    });
    errors.forEach(err => {
      if (err) {
        throw new Error(`Fix your ${type} problems!`);
      }
    });
    process.exit();
  });

  return true;
};

module.exports = {
  checkStaged,
  createStagedComand,
};
