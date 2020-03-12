const mustache = require('mustache');
const path = require('path');

const {
  success, error, getUserInput, read, write, mergePackageJSON, ROOT_PATH,
} = require('../bin/utils.js');

const WEBPACK_TEMPLATE_PATH = path.resolve(ROOT_PATH, 'jakelib', 'templates', 'webpack.js');
const COMPONENT_TEMPLATE_PATH = path.resolve(ROOT_PATH, 'jakelib', 'templates', 'component.js');

const MESOS_BUILD_SCRIPTS = {
  scripts: {
    'mesos_uat-build': 'webpack --config webpack.mesos_uat.config.js --color --profile',
    'mesos-build': 'webpack --config webpack.mesos.config.js --color --profile',
  },
};

namespace('generate', () => {
  desc('this will generate webpack config. Options: name=env_name url=your_url env=staging debug=true');
  task('webpack-config', async () => {
    const name = process.env.name || await getUserInput('Please add your env/config name:\n');

    if (!name) {
      error('Name is mandatory');
      process.exit();
    }

    const url = process.env.url ||  await getUserInput('Please add your app url:\n');
    const debug = process.env.debug || await getUserInput('Do you want debug active?:\n');
    const buildCMD = `${name}-build`;
    mergePackageJSON({ scripts: { [buildCMD]: `webpack --config webpack.${name}.config.js --color --profile` } });

    success('Creating new webpack configs...');

    const webpackTemplate = read(WEBPACK_TEMPLATE_PATH, 'utf8');

    const mesosUat = mustache.render(webpackTemplate, {
      url,
      env: name,
      debug: debug.toLowerCase() === 'n' ? 'false' : true,
    });

    write(path.resolve(ROOT_PATH, `webpack.${name}.config.js`), mesosUat);

    success(`Done! you cand now run yarn ${buildCMD}.`);
  });

  desc('this will generate mesos configs');
  task('mesos-configs', async () => {
    const name = await getUserInput('Please add your mesos app name:\n');

    if (!name) {
      error('Name is mandatory');
      process.exit();
    }

    mergePackageJSON(MESOS_BUILD_SCRIPTS);

    success('Creating new webpack configs...');

    const webpackTemplate = read(WEBPACK_TEMPLATE_PATH, 'utf8');

    const mesos = mustache.render(webpackTemplate, {
      url: `/${name}`,
      env: 'mesos',
    });

    const mesosUat = mustache.render(webpackTemplate, {
      url: `/${name}-uat`,
      env: 'mesos-uat',
    });

    write(path.resolve(ROOT_PATH, 'webpack.mesos.config.js'), mesos);
    write(path.resolve(ROOT_PATH, 'webpack.mesos_uat.config.js'), mesosUat);

    success('Done! you cand now run yarn mesos_uat-build and yarn mesos-build.');
  });

  desc('this will generate a component(it`s just a test, still wip)');
  task('component', async () => {
    const filepath = process.env.path || await getUserInput('Please s your mesos app name:\n');
    const segments = filepath.split('/');
    const name = segments[segments.length - 1].replace('.js', '');

    if (!filepath) {
      error('filepath is mandatory');
      process.exit();
    }

    success('generating file...');

    const componentTemplate = read(COMPONENT_TEMPLATE_PATH, 'utf8');

    const mesos = mustache.render(componentTemplate, {
      name,
    });

    write(path.resolve(ROOT_PATH, filepath), mesos);

    success('Done! If you find yourself making changes on setup please update this in react-kit');
  });
});
