MapPin example:

**Imports**

> import FaMapPin from 'react-icons/lib/fa/map-pin';   

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

Lat and Lng are given to this component when combined with google-map-react  
and is sized and margin to land on the correct location.  
Without this, the pin would be low and to the right.
