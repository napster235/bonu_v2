const path = require('path');

// Escapes a string for being used as ID
const escapeIdentifierName = str => {
  return str.replace(/[\. ]/g, '_');
};

module.exports = {
  ref: true,
  plugins: [
    '@svgr/plugin-svgo',
    (code, config, state) => {
      const svgReg = /<svg[^>]*>/;
      const svgMatch = svgReg.exec(code);

      const contentReg = /<svg[^>]*>(.+?)<\/svg>/;
      const contentMatch = contentReg.exec(code);

      const svgTagCode = svgMatch[0] + '</svg>';
      const svgContentCode = contentMatch[1];

      config.svgContentCode = svgContentCode;
      // prepare jsx prop
      config.svgProps = {
        dangerouslySetInnerHTML: `{dangerouslySetInnerHTMLValue}`,
      };

      return svgTagCode;
    },
    '@svgr/plugin-jsx',
  ],
  template: (
    { template },
    opts,
    { imports, componentName, props, jsx, exports },
  ) => {
    return template.ast`
    ${imports}
    // define jsx prop value
    const dangerouslySetInnerHTMLValue = {__html: '${opts.svgContentCode}'}
    const ${componentName} = (${props}) => ${jsx};
    ${exports}
  `;
  },
  svgoConfig: {
    multipass: false,
    pretty: true,
    indent: 2,
    floatPrecision: 3,
    plugins: [
      {
        convertIdToClass: {
          type: 'perItem',
          active: true,
          name: 'convertIdToClass',
          description: 'convert id attribute to class, using the same value',
          fn: (item, opts, extra) => {
            if (item.isElem() && item.hasAttr('id')) {
              const id = item.attr('id');
              // remove prefix
              const prefix =
                escapeIdentifierName(path.basename(extra.path)) + '__';
              let className = id.value.replace(new RegExp(`^${prefix}`), '');
              // remove suffix
              className = className.replace(/_[0-9]+$/, '');
              item.addAttr({
                name: 'class',
                value: className,
                prefix: '',
                local: 'class',
              });
              // item.removeAttr('id');
            }
          },
        },
      },
      { removeDoctype: true },
      { removeXMLProcInst: true },
      { removeComments: true },
      { removeMetadata: true },
      { removeXMLNS: false },
      { removeEditorsNSData: true },
      { cleanupAttrs: false },
      { inlineStyles: true },
      { minifyStyles: true },
      { convertStyleToAttrs: true },
      { cleanupIDs: { remove: false } },
      { prefixIds: true },
      { removeRasterImages: false },
      { removeUselessDefs: true },
      { cleanupNumericValues: true },
      { cleanupListOfValues: true },
      { convertColors: true },
      { removeUnknownsAndDefaults: true },
      { removeNonInheritableGroupAttrs: true },
      { removeUselessStrokeAndFill: false },
      { removeViewBox: false },
      { cleanupEnableBackground: false },
      { removeHiddenElems: false },
      { removeEmptyText: false },
      { convertShapeToPath: false },
      { moveElemsAttrsToGroup: false },
      { moveGroupAttrsToElems: false },
      { collapseGroups: false },
      { convertPathData: true },
      { convertTransform: false },
      { removeEmptyAttrs: true },
      { removeEmptyContainers: true },
      { mergePaths: true },
      { removeUnusedNS: true },
      { sortAttrs: true },
      { removeTitle: true },
      { removeDesc: true },
      { removeDimensions: true },
      { removeAttrs: false },
      { removeAttributesBySelector: false },
      { removeElementsByAttr: false },
      { addClassesToSVGElement: false },
      { removeStyleElement: false },
      { removeScriptElement: false },
      { addAttributesToSVGElement: false },
      { removeOffCanvasPaths: false },
      { reusePaths: false },
    ],
  },
};
