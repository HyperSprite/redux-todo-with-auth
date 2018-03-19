# Form Inputs
There is a lot to unpack here. For now...

Form state is managed by Redux-form. It handles a lot of the grunt work with forms but like anything else, there is quite a bit of customization to integrate it with material and create forms elements that are not part of the standard bundle, like the range inputs.   

Form values are found in the form-value file for each view. This file has an array of objects that is mapped over to return whatever input is required. You can see sample blocks below. All of the form fields can be found in this directory ```/src/client/components/form/edit``` and are currently undergoing the migration to material-ui.

Although I thought of this idea of having an array in charge on the input fields while working on a multi-page form, I have since learned there is a project by the Mozilla people called ```react-jsonschema-form``` if you are interested in something a little better tested, etc.

The form elements are not called directly by the form view, instead, the ```/form/edit/switch``` component is imported and it will wrap the specified ```component``` with the Redux-form Field, found in the ```/form/edit/wrap-redux-form.``` file.

> Note: You may see reference to the 'addButtonset' properties and setup in the files. There is actually an "edit in place" feature built into this system but it is currently not in use in this project. I built it for another project, in Bootstrap no less and imported it here later. When setup, the user would click on a value and the form field and button set appear, on a successful edit, the static display returns with the new value.  

## Downshift autocomplete (new for material-ui)

There are currently four different iterations of this component. Over time I'll slim that down although there will probably always be two.
The two main variants are Single and Multi.

* Single works on a single string value.
* Multi works on an array of values.

How they receive their suggestions is the other difference.

* Strings receive an array of strings.
* Obj receive an array of objects in the form of { value, label }.

The form-values input object is the same for all four although normalizer is not yet implemented on the Single value component because I may do this with Redux-form's normalizer instead. The special props are:

* data: URL to someplace that returns an array of values.
* allowNew: ? True allows for new values to be typed into the field. : False will only allow picking of an item.

```js
{
  name: 'eventSeries',
  label: 'Series',
  type: 'text',
  component: 'InputDownshiftString',
  contentAlt: '',
  contentOptions: { data: '/apiv1/autocomplete/distinct/events/series', allowNew: false /* , normalizer: '[^a-zA-Z0-9\':,- ]'*/ },
  contentHelp: '',
  addButtonset: false,
},
```

The data is being handled by the withData HOC found in the containers directory. It's super simple, pass it a URL and it will return a prop called ```data``` with the array of values. It looks like this in the downshift files:

```js
const styledInputDownshiftString = withStyles(styles, { name: 'styledInputDownshiftString' })(InputDownshiftString);
const withAutoData = withData(props => props.contentOptions.data);
export default withAutoData(styledInputDownshiftString);
```  
> I know, I could be using compose for this. That will come after I'm done with the material-ui upgrade.


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
