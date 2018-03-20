# Buttons

## Current Buttons
```js
import ButtonAdd from '../button/add';
import ButtonBase from '../button/base';
import ButtonCancel from '../button/cancel';
import ButtonClose from '../button/close';
import ButtonDelete from '../button/delete';
import ButtonDownload from '../button/downlaod';
import ButtonOpen from '../button/open';
import ButtonPrint from '../button/print';
import ButtonProgress from '../button/progress';
import ButtonRefresh from '../button/refresh';
import ButtonReset from '../button/reset';
import ButtonSave from '../button/save';
import ButtonSearch from '../button/search';
```

## Examples

### Plain button (no icon)
```js
import ButtonBase from '../button/base';

<ButtonBase
  onClick={handleClose}
  label="Close"
/>
```


### Fully prop'ed out button Save icon

```js
import ButtonSave from '../button/save';

<ButtonSave
  onClick={handleSave}
  color="primary"
  label="Save"
  hasIcon={true}
  size="small"
  toolTip="Save this"
  toolTipId="tooltip-save"
  toolTipPlacement="bottom"
  variant="flat"
/>
```

### Example of a link button

```js
import { Link } from 'react-router-dom';
import ButtonOpen from '../button/open';

<ButtonOpen
  component={Link}
  to="/club-notice"
  label="Club Notice"
  color="inherit"
/>
```
