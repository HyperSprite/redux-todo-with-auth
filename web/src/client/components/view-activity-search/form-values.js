export const thisForm = 'searchform';
export const title = 'Activity Search';
export const help = 'https://blog.araceathlete.com/activity-search';
export const relURL = 'apiv1/activities/search-activities';

export const formValues = [
  {
    name: 'textsearch',
    label: 'Search Terms',
    type: 'text',
    group: 'text',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: 'Activity Name',

    addButtonset: false,
  },
  {
    name: 'lat',
    label: 'Latitude',
    type: 'number',
    group: 'geo',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: '',
    addButtonset: false,
    normalize: 'numbersOnly',
  },
  {
    name: 'lng',
    label: 'Longitude',
    type: 'number',
    group: 'geo',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: '',
    addButtonset: false,
    normalize: 'numbersOnly',
  },
  {
    name: 'maxDist',
    label: 'Max Distance',
    type: 'text',
    group: 'geo',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: 'Default 80km (50 miles)',
    addButtonset: false,
    normalize: 'numbersOnly',
  },
  {
    name: 'wildcard',
    label: 'Precision',
    type: 'checkbox',
    group: 'text',
    component: 'InputCheckbox',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: '',
    addButtonset: false,
  },
  {
    name: 'filter_commute',
    label: 'Commute',
    // redux-form, don't set to 'radio', see issue 2880
    type: 'text',
    group: 'filter',
    component: 'InputRadioCheckbox',
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
    addButtonset: false,
  },
  {
    name: 'filter_trainer',
    label: 'Trainer',
    // redux-form, don't set to 'radio', see issue 2880
    type: 'text',
    group: 'filter',
    component: 'InputRadioCheckbox',
    contentAlt: '',
    contentOptions: {
      data: [
        { value: '', label: 'Inclusive' },
        { value: '1', label: 'Exclusive' }, // [fIEE.contentName]: true
        { value: '2', label: 'Excluded' }, // [fIEE.contentName]: false
      ],
    },
    contentHelp: '',
    contentPlaceholder: '',
    addButtonset: false,
  },
  {
    name: 'filter_description',
    label: 'Description',
    // redux-form, don't set to 'radio', see issue 2880
    type: 'text',
    group: 'filter',
    component: 'InputRadioCheckbox',
    contentAlt: '',
    contentOptions: {
      data: [
        { value: '', label: 'Inclusive' },
        { value: '3', label: 'Exclusive' }, // [fIEE.contentName]: { $exists: true }
        // { value: '2', label: 'Excluded' },
      ],
    },
    contentHelp: '',
    contentPlaceholder: '',
    addButtonset: false,
  },
];
