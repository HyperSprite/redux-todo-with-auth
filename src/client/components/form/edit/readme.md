# Form Inputs
There is a lot to unpack here. For now...



## Radio and Checkbox Group

Both of these will only allow one option to be chosen at a time.
The difference between these two is the elimination of a required pick.
Use the check boxes to if picking 'none' is an option.

It is easy to try both types out, just change the componentType: ``` 'InputRadio' || 'InputRadioCheckbox'```

> Values are strings (notice the quotes), this is what is passed on the form submit. ```filter_commute=2```

These take the same input, an objects with the following form:

```js
  {
    name: 'filter_commute',
    label: 'Commute',
    contentAlt: '',
    contentOptions: {
      data: [
        { value: '', label: 'Inclusive' },
        { value: '1', label: 'Exclusive' },
        { value: '2', label: 'Excluded' },
      ],
    },
    contentHelp: '',
    contentPlaceholder: '',
    type: 'filter',
    component: 'InputRadio',
    addButtonset: false,
  },
```
