MapPin example:

**Imports**

> import FaMapPin from 'react-icons/lib/fa/map-pin';  
> import theme from '../../styles/theme';  
> import style from './style';

```js
<MapPin />
```

```js
<MapPin
  lat={39.28756}
  lng={120.19987}
  color='#D32F2F'
/>
```

Lat and Lng are given to this compoent when combined with google-map-react  
and is sized and margined to land on the correct location.  
Without this, the pin would be low and to the right.
