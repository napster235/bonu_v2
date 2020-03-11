import * as d3 from 'd3';
import {
  curry,
  isNil,
  mergeRight,
  when,
} from 'ramda';

export const isPercentage = v => v.toString().indexOf('%') > -1;

export const getMargin = (dim, margin) => {
  if (isPercentage(margin)) {
    return dim * (parseInt(margin, 10) / 100);
  }
  return parseInt(margin, 10);
};

export const computeDimension = (dimension, marginX, marginY) => {
  return dimension - getMargin(dimension, marginX) - getMargin(dimension, marginY);
};

export function wrapSvgText(text, width) {
  // eslint-disable-next-line func-names
  text.each(function () {
    // eslint-disable-next-line no-shadow
    const text = d3.select(this);
    const words = text.text().split(/\s+/).reverse();
    let word;
    let line = [];
    let lineNumber = 0;
    const lineHeight = 1.1; // em
    const x = text.attr('x');
    const y = text.attr('y');
    const dy = parseFloat(text.attr('dy'));
    let tspan = text.text(null).append('tspan')
      .attr('x', x)
      .attr('y', y)
      .attr('dy', `${dy}em`);

    /* eslint-disable-next-line */
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        lineNumber += 1;
        tspan = text.append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', `${(lineNumber * lineHeight) + dy}em`)
          .text(word);
      }
    }
  });
}

export const selectionOr = curry((
  /** @type {() => d3.Selection} */ callback,
  /** @type {d3.Selection} */ selection,
) => {
  return when(sel => sel.empty(), callback, selection);
});


export const initSvg = (container, { width, height, margin: argsMargin }) => {
  if (isNil(width)) throw new Error('Missing param: width');
  if (isNil(height)) throw new Error('Missing param: height');

  const margin = mergeRight({
    top: 0, bottom: 0, left: 0, right: 0,
  }, argsMargin);

  const svg = selectionOr(() => {
    return container.append('svg').attr('pointer-events', 'visible');
  }, container.select('svg'));

  svg.attr('width', width).attr('height', height);

  const chartHeight = computeDimension(height, margin.top, margin.bottom);
  const chartWidth = computeDimension(width, margin.left, margin.right);

  const g = selectionOr(() => {
    return svg.append('g').attr('class', 'main');
  }, svg.select('g.main'));

  g.attr('width', chartWidth)
    .attr('height', chartHeight)
    .attr('transform', `translate(${getMargin(width, margin.left)}, ${getMargin(height, margin.top)})`);

  return {
    svg, g, chartWidth, chartHeight,
  };
};
