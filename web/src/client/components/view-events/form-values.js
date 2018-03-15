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
    contentOptions: { data: '/apiv1/autocomplete/distinct/events/hashtags', allowNew: true, normalizer: '[^a-zA-Z0-9]' },
    contentHelp: '',
    type: 'text',
    component: 'InputDownshiftMultiString',
    addButtonset: false,
  },
  {
    name: 'eventDate',
    label: 'Event Date',
    type: 'date',
    component: 'InputText',
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
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
  },
  {
    name: 'eventOrg',
    label: 'Organizer',
    type: 'text',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
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
    // full width
  },
  {
    name: 'eventDesc',
    label: 'Description (Markdown)',
    type: 'text',
    component: 'InputText',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    addButtonset: false,
    // MDField
    // full width
    // multiLine
    // show staticMD
    // <StaticMD
    //  label="Formatted"
    //  content={eventSelector.eventDesc}
    // />
  },
  // {
  //   name: 'eventRoutes',
  //   label: 'Routes',
  //   contentAlt: '',
  //   contentOptions: null,
  //   contentHelp: '',
  //   type: 'text',
  //   component: 'SingleFieldArray',
  //   addButtonset: false,

  // component={EditEventRoute}
  // fetchStravaRoutes={this.fetchStravaRoutes}
  // eventSelector={eventSelector.eventRoutes}

  // },
  // {
  //   name: 'eventOwners',
  //   label: 'Owners',
  //   contentAlt: '',
  //   contentOptions: null,
  //   contentHelp: '',
  //   type: 'text',
  //   component: 'SingleFieldArray',
  //   addButtonset: false,
  // },
];
