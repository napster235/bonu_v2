import React from 'react';
import {
  SlideContent,
  SlideContentContainer,
  SlideNavigationBar,
} from 'insight-center-theme';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SlideContentContainer className="example">
        <SlideNavigationBar />
        <SlideContent>
          Example content
        </SlideContent>
      </SlideContentContainer>
    );
  }
}

export default Example;
