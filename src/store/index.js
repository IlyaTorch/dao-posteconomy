import { createGlobalState } from 'react-hooks-global-state'
import moment from 'moment'

const DEFAULT_TAGS = [
    "it", "programming", "education", "travel", "sport", "europe", "web3"
]

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  createProposalModal: 'scale-0',
  loginModal: 'scale-0',
  connectedAccount: '',
  contract: null,
  dao_addresses: [],
  daos: [],
  filtered_daos: [],
  currentUser: null,
  isStakeholder: false,
  balance: 0,
  mybalance: 0,
  proposals: [],
  daoDetailsMenuItem: 'members',
  tags: DEFAULT_TAGS,
})

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars)
    var end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const daysRemaining = (days) => {
  const todaysdate = moment()
  days = Number((days + '000').slice(0))
  days = moment(days).format('YYYY-MM-DD')
  days = moment(days)
  days = days.diff(todaysdate, 'days')
  return days == 1 ? '1 day' : days + ' days'
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncate,
  daysRemaining,
  DEFAULT_TAGS,
}
