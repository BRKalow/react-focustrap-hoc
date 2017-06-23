## react-focustrap-hoc

This higher-order-component can be wrapped around any component to ensure that focus will be trapped inside that component. This is useful in accessibility cases where you do not want a guest using keyboard navigation to leave a certain element context, such as a dropdown menu or a modal.

### Usage
```js
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

_Note: Currently, this HOC will only support non-dynamic components, meaning the focusable elements will not be recalculated if the children of the wrapped component change._