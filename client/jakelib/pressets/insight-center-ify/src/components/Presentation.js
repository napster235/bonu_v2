import React from 'react';
import {
  Deck,
  Slide,
  SlideGroup,
  IntroSlide,
  // RedirectDeck,
} from 'insight-center-theme';
import images from 'assets/images/index.js';

import Example from 'components/example/Example';

import ENV from 'environment.js';

const Presentation = ({ title: presentationTitle }) => (
  <Deck
    title={presentationTitle}
    introSlide={(
      <Slide path="/intro">
        <IntroSlide
          imageAssets={images}
        />
      </Slide>
    )}
    mainGroupPath="/main"
    debug={ENV.debug}
    utilitiesEnabled={ENV.debug}
  >
    <SlideGroup path="/main">
      <Slide path="/example">
        <Example />
      </Slide>
      {/* <RedirectDeck to="/main" /> */}
    </SlideGroup>
  </Deck>
);

export default Presentation;
