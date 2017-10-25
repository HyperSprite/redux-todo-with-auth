# VisibilitySensorLock

This is meant to lazy load images, maps or other large resources and then keep on the page so they don't need to be reloaded.

Basic example with a map:
```js
import VisibilitySensorLock from '../../containers/visibility-sensor-lock';

{listOfThings.map(lOT => (
  <VisibilitySensorLock>
    <ChildComponent />
  </VisibilitySensorLock>
))}
```

ChildComponent (could be any component), will not load until it is just off screen.

Once loaded, ChildComponent will be kept in the dom (locked) and the onChange will be disabled.

The default VisibilitySensor will unload ChildComponent as is goes back off screen.

For more info on VisibilitySensor see the [repo](https://github.com/joshwnj/react-visibility-sensor)
