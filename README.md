# react-focustrap-hoc

This higher-order-component can be wrapped around any component to ensure that focus will be trapped inside that component. This is useful in accessibility cases where you do not want a user using keyboard navigation to leave a certain element context, such as a dropdown menu or a modal.

## Usage
Default usage:
```js
import React from 'react';
import focusTrap from 'react-focustrap-hoc';

const ExampleList = ({ ...restProps }) => (
  <ul {...restProps}>
    <li><a>example</a></li>
    <li><a>example</a></li>
    <li><a>example</a></li>
    <li><a>example</a></li>
  </ul>
)

export default focusTrap(ExampleList);
```

With arrow key navigation:
```js
import React from 'react';
import focusTrap from 'react-focustrap-hoc';

const ExampleList = ({ ...restProps }) => (
  <ul {...restProps}>
    <li><a>example</a></li>
    <li><a>example</a></li>
    <li><a>example</a></li>
    <li><a>example</a></li>
  </ul>
)

export default focusTrap(ExampleList, { arrowKeyNavigation: true });
```

_Note: Currently, this HOC will only support non-dynamic components, meaning the focusable elements will not be recalculated if the children of the wrapped component change._

## Options
| Name               | Default | Description                                                                |
|--------------------|---------|----------------------------------------------------------------------------|
| arrowKeyNavigation | `false` | Determines wether a user can navigate through the element using arrow keys |
