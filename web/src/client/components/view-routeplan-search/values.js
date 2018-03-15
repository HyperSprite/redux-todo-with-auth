export const thisForm = 'searchform';
export const title = 'Route Search';
export const relURL = 'apiv1/routeplan/search';
export const formValues = [
  {
    name: 'textsearch',
    label: 'Search Terms',
    contentAlt: '',
    contentOptions: null,
    contentHelp: '',
    contentPlaceholder: 'Route Name',
    type: 'text',
    component: 'Input',
    addButtonset: false,
  },
  // { TODO need to build a better checkbox
  //   contentName: 'wildcard',
  //   contentLabel: 'Alternate Search',
  //   contentAlt: '',
  //   contentOptions: null,
  //   contentHelp: '',
  //   contentPlaceholder: '',
  //   contentType: 'checkbox',
  //   componentType: 'Input',
  //   addButtonset: false,
  // },
];
