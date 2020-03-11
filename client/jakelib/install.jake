const { readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const mustache = require('mustache');
const showdown = require('showdown');
const jsdom = require('jsdom');
const { join, map } = require('ramda');

const { JSDOM } = jsdom;

const {
  invoke,
} = require('./task-utilities.js');

const {
  success,
  getUserInput,
  warn,
  system,
  gitClone,
  readJSON,
  mergePackageJSON,
  write,
  read,
  PACKAGE_JSON_PATH,
  VENDOR_PATH,
  ROOT_PATH,
} = require('../bin/utils.js');

const UI_KIT_TEMPLATE_PATH = path.resolve(ROOT_PATH, 'jakelib', 'templates', 'react-ui-kit.scss');

const INSIGHT_CENTER_IFY_PATH = 'jakelib/pressets/insight-center-ify/.';
const RECORD_STORE_PATH = 'jakelib/pressets/record-store/.'
const PROJECT_README_PATH = './README.md';

const INSIGHT_CENTER_PACKAGES = {
  vendorDependencies: {
    chartographer:
      'git+ssh://git@gitlab.sparktech.ro:react-kit/chartographer.git',
    'insight-center-theme':
      'git+ssh://git@gitlab.sparktech.ro:insight-center/insight-center-theme.git',
    'react-hero': 'git+ssh://git@gitlab.sparktech.ro:react-kit/react-hero.git',
    'react-stepper':
      'git+ssh://git@gitlab.sparktech.ro:react-kit/react-stepper.git',
    'spark-js-utils':
      'git+ssh://git@gitlab.sparktech.ro:react-kit/spark-js-utils.git',
  },
  devDependencies: {
    '@svgr/webpack': '^4.3.2',
  },
  dependencies: {
    'react-pose': '^4.0.8',
  },
  scripts: {
    "figma-sync": "./bin/figma-sync",
  }
};

const RECORD_STORE_PACKAGES = {
  vendorDependencies: {
    'record-store':
      'git+ssh://git@gitlab.sparktech.ro:react-kit/record-store.git',
  },
};

const UI_KIT_PACKAGES = {
  vendorDependencies: {
    'react-ui-kit':
      'git+ssh://git@gitlab.sparktech.ro:react-kit/react-ui-kit.git',
  },
};

namespace('install', () => {
  desc('this will add insight center stuff to your project');
  task('insight-center', async () => {
    mergePackageJSON(INSIGHT_CENTER_PACKAGES);

    await invoke('install:vendor-dependencies');

    await invoke('install:merge-presets', INSIGHT_CENTER_IFY_PATH);
    success('copying insight-center specific files...');

    await invoke('install:merge-readme', INSIGHT_CENTER_IFY_PATH);
    success('merging plugins README...');

    success(
      'Done! If you find yourself making anymore changes on setup please update this in react-kit',
    );
  });

  desc('this will react-ui-kit to your project');
  task('ui-kit', async () => {
    mergePackageJSON(UI_KIT_PACKAGES);

    await invoke('install:vendor-dependencies');

    const answer =
      (await getUserInput(
        `What theme do you want?
1.light (default)
2.dark\n`,
      )) || '1';

    const mapping = {
      1: 'light',
      2: 'dark',
    };

    if (mapping[answer]) {
      const uiKitTemplate = read(UI_KIT_TEMPLATE_PATH, 'utf8');
      const styleFile = mustache.render(uiKitTemplate, {
        theme: mapping[answer],
      });

      write(path.resolve(ROOT_PATH, 'src', 'style', 'vendors', '_index.scss'), styleFile);
      success('copying insight-center specific files...');
    } else {
      error('not a valid theme, please config src/style/vendor/_index.scss manually');
      process.exit();
    }

    success(
      'Done! If you find yourself making anymore changes on setup please update this in react-kit',
    );
  });

  desc('this will add record store and init it');
  task('record-store', async () => {
    mergePackageJSON(RECORD_STORE_PACKAGES);

    await invoke('install:vendor-dependencies');

    const answer =
      (await getUserInput(
        'Do you want to init record-store and replace store.js?(Y/n):',
      )) || 'y';

    if (answer.toLocaleLowerCase() === 'y') {
      await invoke('install:merge-presets', RECORD_STORE_PATH);
      success('copying record-store init files...');
    } else {
      warn('Skipped copying files');
    }

    success(
      'Done! If you find yourself making anymore changes on setup please update this in react-kit',
    );
  });

  desc('this will install gitlab vendor dependencies');
  task('vendor-dependencies', async () => {
    success('Creating vendor if it doesn\'t exist');

    jake.mkdirP(path.resolve(ROOT_PATH, 'vendor'));

    const { vendorDependencies: dependencies } = readJSON(PACKAGE_JSON_PATH);

    if (!Object.keys(dependencies).length) {
      warn('no vendor dependencies to install');
      return;
    }

    Object.keys(dependencies).forEach(key => {
      const gitUrl = dependencies[key];
      const [repo, tag] = gitUrl.replace('git+ssh://', '').split('#');
      system(`rm -rf vendor/${key}`);
      gitClone(repo, tag);
      const { files } = readJSON(path.resolve(ROOT_PATH, 'vendor', key, 'package.json'));
      if (!files) {
        jake.rmRf(path.join(VENDOR_PATH, key, '.git'));
        warn('package has no files declared. skipping delete... Please delete useless vendor files manually');
        return
      }
      warn(`Keeping only ${files} based on cloned package.json`);

      readdirSync(path.join(VENDOR_PATH, key)).forEach(file => {
        if (files.includes(file)) {
          return
        }
        jake.rmRf(path.join(VENDOR_PATH, key, file));
      });
    });
    const newDependencies = {};

    Object.keys(dependencies).forEach(key => {
      newDependencies[key] = `file:./vendor/${key}`;
    });

    mergePackageJSON({ dependencies: newDependencies });

    system('yarn install --force');

    success(
      'Done! If you find yourself making anymore changes on setup please update this in react-kit',
    );
  });

  desc('this will merge README from plugins into project README');
  task('merge-readme', async (presetPath) => {
    const syncReadmeData = readFileSync(`${presetPath}/README.md`, { encoding: 'utf8' });
    const projectReadmeData = readFileSync(PROJECT_README_PATH, { encoding: 'utf8' });

    const converter = new showdown.Converter();
    converter.setOption('literalMidWordUnderscores', false);
    converter.setOption('disableForced4SpacesIndentedSublists', true);
    converter.setOption('simpleLineBreaks', false);

    const syncReadmeHTML = converter.makeHtml(syncReadmeData);
    const projectReadmeHTML = converter.makeHtml(projectReadmeData);

    const readmeDOM = new JSDOM(projectReadmeHTML);
    readmeDOM.window.document.querySelector('#plugins').insertAdjacentHTML('beforeend', syncReadmeHTML);

    const tempDOM = new JSDOM();
    const mergedREADME = converter.makeMarkdown(readmeDOM.serialize(), tempDOM.window.document);
    writeFileSync('README.md', mergedREADME, err => {
      if (err) {
        throw err;
      }
    });
  });

  task('merge-presets', async (presetPath, excludePatterns = ['README.md']) => {
    system(`rsync -r ${presetPath} . ${join(' ', map(pattern =>  `--exclude=${pattern}`, excludePatterns))}`);
  });
});

jake.addListener('complete', () => {
  process.exit();
});
