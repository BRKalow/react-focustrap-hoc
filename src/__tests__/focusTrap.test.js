import React from 'React';
import { mount } from 'enzyme';
import focusTrap from '../index';
import { keyMap } from '../utils';

const makeEvent = args => new KeyboardEvent('keydown', args);

const Component = focusTrap(() => (
  <div>
    <a href="#" id="link-1">Link 1</a>
    <a href="#" id="link-2">Link 2</a>
    <a href="#" id="link-3">Link 3</a>
  </div>
), { arrowKeyNavigation: true });

describe('focusTrap', () => {
  it('wraps focus to the last element on tab back from first element', () => {
    const wrapper = mount(<Component />);
    wrapper.find('#link-1').node.dispatchEvent(makeEvent({ keyCode: keyMap.TAB, shiftKey: true }));
    expect(document.activeElement).toBe(wrapper.find('#link-3').node);
  });

  it('wraps focus to the first element on tab through last element', () => {
    const wrapper = mount(<Component />);
    wrapper.find('#link-3').node.dispatchEvent(makeEvent({ keyCode: keyMap.TAB }));
    expect(document.activeElement).toBe(wrapper.find('#link-1').node);
  });

  it('allows arrow key navigation', () => {
    const wrapper = mount(<Component />);
    
    wrapper.find('#link-1').node.dispatchEvent(makeEvent({ keyCode: keyMap.ARROW_DOWN }));
    expect(document.activeElement).toBe(wrapper.find('#link-2').node);

    wrapper.find('#link-2').node.dispatchEvent(makeEvent({ keyCode: keyMap.ARROW_UP }));
    expect(document.activeElement).toBe(wrapper.find('#link-1').node);
  });
});