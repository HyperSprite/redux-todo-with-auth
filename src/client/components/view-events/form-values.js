export const thisForm = 'editevent';
export const title = 'Edit Event';
export const help = '/blog/events';
export const relURLAdd = 'apiv1/events/addevent';
export const relURLEdit = 'apiv1/events';

export const formValues = [
  {
    name: 'eventTitle',
    label: 'Event Title',
    type: 'text',
    component: 'InputText',
    addButtonset: false,
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    fullWidth: true,
  },
  {
    name: 'eventHashtags',
    label: 'Hashtags',
    contentAlt: '',
    contentOptions: {
      data: '/apiv1/autocomplete/distinct/events/hashtags',
      allowNew: true,
      normalizer: '[^a-zA-Z0-9]',
    },
    contentHelp: '',
    type: 'text',
    component: 'InputDownshiftMultiString',
    addButtonset: false,
    fullWidth: true,
  },
  {
    name: 'eventDate',
    label: 'Event Date',
    type: 'date',
    component: 'InputDatePicker',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
  },
  {
    name: 'eventDays',
    label: 'Number of Days',
    type: 'number',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    placeholder: '',
    addButtonset: false,
    min: '1',
  },
  {
    name: 'eventAthleteType',
    label: 'Type',
    type: 'text',
    component: 'InputRadio',
    contentOptions: {
      data: [
        { value: 'Cycling', label: 'Cycling' },
        { value: 'Running', label: 'Running' },
        { value: 'Triathlon', label: 'Triathlon' },
      ],
    },
    contentAlt: '',
    contentHelp: '',
    placeholder: '',
    addButtonset: false,
  },
  {
    name: 'eventSeries',
    label: 'Series',
    type: 'text',
    component: 'InputDownshiftString',
    contentAlt: '',
    contentOptions: {
      data: '/apiv1/autocomplete/distinct/events/series',
      allowNew: true,
      normalizer: '[^a-zA-Z0-9\',- ]',
    },
    contentHelp: '',
  },
  {
    name: 'eventOrg',
    label: 'Organizer',
    type: 'text',
    component: 'InputDownshiftString',
    contentAlt: '',
    contentOptions: {
      data: '/apiv1/autocomplete/distinct/events/organizer',
      allowNew: true,
      normalizer: '[^a-zA-Z0-9\\\', -]',
    },
    contentHelp: '',
    addButtonset: false,
  },
  {
    name: 'eventLocStreet',
    label: 'Street',
    type: 'text',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
  },
  {
    name: 'eventLocCity',
    label: 'City',
    type: 'text',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
  },
  {
    name: 'eventLocState',
    label: 'State',
    type: 'text',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
  },
  {
    name: 'eventLocCountry',
    label: 'Country',
    type: 'text',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
  },
  {
    name: 'eventLocZip',
    label: 'ZIP Code',
    type: 'number',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
  },
  {
    name: 'eventURL',
    label: 'Event Homepage URL',
    type: 'text',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
    fullWidth: true,
  },
  {
    name: 'eventDesc',
    label: 'Description (Markdown)',
    type: 'text',
    component: 'InputTextMarkdown',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
    fullWidth: true,
    multiline: true,
    // MDField
    // full width
    // multiline
    // show staticMD
    // <StaticMD
    //  label="Formatted"
    //  content={eventSelector.eventDesc}
    // />
  },
];
