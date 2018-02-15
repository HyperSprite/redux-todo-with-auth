export const thisForm = 'searchform';
export const title = 'Activity Search';
export const relURL = 'apiv1/activities/search-activities';

export const formValues = [
  {
    contentName: 'textsearch',
    contentLabel: 'Search Terms',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: 'Activity Name',
    contentType: 'text',
    componentType: 'InputText',
    addButtonset: false,
  },
  {
    contentName: 'lat',
    contentLabel: 'Latitude',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: '',
    contentType: 'geo',
    componentType: 'InputText',
    addButtonset: false,
    normalize: 'numbersOnly',
  },
  {
    contentName: 'lng',
    contentLabel: 'Longitude',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: '',
    contentType: 'geo',
    componentType: 'InputText',
    addButtonset: false,
    normalize: 'numbersOnly',
  },
  {
    contentName: 'maxDist',
    contentLabel: 'Max Distance',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: 'Default 80km (50 miles)',
    contentType: 'geo',
    componentType: 'InputText',
    addButtonset: false,
    normalize: 'numbersOnly',
  },
  {
    contentName: 'wildcard',
    contentLabel: 'Fuzzy search',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: '',
    contentType: 'filter',
    componentType: 'InputCheckbox',
    addButtonset: false,
  },
  {
    contentName: 'filter_commute',
    contentLabel: 'Commute',
    contentAlt: '',
    contentOptions: [
      { value: '', label: 'Inclusive' },
      { value: '1', label: 'Exclusive' },
      { value: '2', label: 'Excluded' },
    ],
    contentHelp: '',
    contentPlaceholder: '',
    contentType: 'filter',
    componentType: 'InputRadio',
    addButtonset: false,
  },
  {
    contentName: 'filter_trainer',
    contentLabel: 'Trainer',
    contentAlt: '',
    contentOptions: [
      { value: '', label: 'Inclusive' },
      { value: '1', label: 'Exclusive' },
      { value: '2', label: 'Excluded' },
    ],
    contentHelp: '',
    contentPlaceholder: '',
    contentType: 'filter',
    componentType: 'InputRadio',
    addButtonset: false,
  },

  // {
  //   contentName: 'sort_distance',
  //   contentLabel: 'Distance',
  //   contentAlt: '',
  //   contentOptions: [
  //     { value: 'des', desc: 'Decending' },
  //     { value: 'asc', desc: 'Ascending' },
  //   ],
  //   contentHelp: '',
  //   contentPlaceholder: '',
  //   contentType: 'checkbox',
  //   componentType: 'InputText',
  //   addButtonset: false,
  // },

];
