export const bindings = [
  'handleTextChange',
  'runSuite',
  'invalidInput',
  'onGetStrategyById',
  'onRunSuite',
  'sendForDefaults',
  'setListeners',
  'removeListeners',
]

export const commands = [
  {
    type: 'MULTI',
    command: 'SIGNAL_RATE_OT',
    description: 'Number of signals found through time on average across sessions.',
  },
  {
    type: 'MULTI',
    command: 'ORDER_RATE_OT',
    description: 'Number of orders placed through time on average across sessions.',
  },
  {
    type: 'MULTI',
    command: 'FILL_RATE_OT',
    description: 'Number of orders filled through time on average across sessions.',
  },
  {
    type: 'MULTI',
    command: 'CANCEL_RATE_OT',
    description: 'Number of orders cancelled through time on average across sessions.',
  },
  { type: 'SINGLE', command: 'AVG_FEE_OT', description: 'Average fee across time for session.' },
  {
    type: 'SINGLE',
    command: 'FUNDS_CHANGE_OT',
    description: 'Percent change of funds through time for session.',
  },
  { type: 'SINGLE', command: 'SIDE_RATIO', description: 'Buy/Sell ratio for session.' },
  { type: 'SINGLE', command: 'ORDER_TYPE_RATIO', description: 'Market/Limit ratio for session.' },
  {
    type: 'MULTI',
    command: 'AVG_SESSION_TIME',
    description: 'Average session time length across sessions.',
  },
  {
    type: 'MULTI',
    command: 'AVG_FUNDS_CHANGE_PERCENTAGE',
    description: 'Percentage change in funds across sessions.',
  },
]
