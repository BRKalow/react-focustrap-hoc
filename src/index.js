import React, { Component } from 'react';
import tabbable from 'tabbable';
import { tabPressed, shiftTabPressed, keyMap } from './utils';

const getDisplayName = comp => comp.displayName || comp.name || 'Component';

export default function focusTrap(WrappedComponent, { arrowKeyNavigation } = {}) {
  class FocusTrap extends Component {
    constructor(props) {
      super(props);

      this.trapFocus = this.trapFocus.bind(this);
      this.focusToElementByIndex = this.focusToElementByIndex.bind(this);
    }

    componentDidMount() {
      if (this.container) {
        this.focusableEls = tabbable(this.container);

        if (arrowKeyNavigation) {
          this.focusableEls.forEach(element => element.addEventListener('keydown', this.trapFocus));
        } else {
          const lastIndex = this.focusableEls.length - 1;
          // Only attach the listeners to the first and last element
          this.focusableEls[0].addEventListener('keydown', this.trapFocus);
          this.focusableEls[lastIndex].addEventListener('keydown', this.trapFocus);
        }
      }
    }

    componentWillUnmount() {
      this.focusableEls.forEach(element => element.removeEventListener('keydown', this.trapFocus));
    }

    focusToElementByIndex(index = 0) {
      this.focusableEls[index].focus();
    }

    trapFocus(e) {
      const { keyCode, target } = e;
      const lastIndex = this.focusableEls.length - 1;
      const currentIndex = this.focusableEls.indexOf(target);
      const firstElement = currentIndex === 0;
      const lastElement = currentIndex === lastIndex;
      // Check if arrow key navigation happened
      const arrowUpPressed = arrowKeyNavigation && keyCode === keyMap.ARROW_UP;
      const arrowDownPressed = arrowKeyNavigation && keyCode === keyMap.ARROW_DOWN;

      if (firstElement) {
        if (shiftTabPressed(e) || arrowUpPressed) {
          e.preventDefault();
          return this.focusToElementByIndex(lastIndex);
        }
      }

      if (lastElement) {
        if (tabPressed(e) || arrowDownPressed) {
          e.preventDefault();
          return this.focusToElementByIndex(0);
        }
      }

      if (arrowUpPressed) {
        e.preventDefault();
        return this.focusToElementByIndex(currentIndex - 1);
      }

      if (arrowDownPressed) {
        e.preventDefault();
        return this.focusToElementByIndex(currentIndex + 1);
      }

      return null;
    }

    render() {
      return (
        <div ref={el => (this.container = el)}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  FocusTrap.displayName = `FocusTrap(${getDisplayName(WrappedComponent)})`;
  return FocusTrap;
}
