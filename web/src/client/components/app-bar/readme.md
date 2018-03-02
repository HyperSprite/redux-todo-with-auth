ExtAppBar example:

```js
<ExtAppBar leftIcon="menu" />
```

```js
<ExtAppBar
  title="A Race athlete blog"
  rightOnClick={() => window.location.assign('https://google.com')}
  rightText="Connect with Google"
/>
```

```js
<ExtAppBar
  rightImgSrc="btn_strava_connectwith_light.svg"
  rightOnClick={() => window.location.assign('https://google.com')}
  rightText="Connect with Strava"
/>
```
