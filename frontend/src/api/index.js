// implement your own methods in here, if your data is coming from A rest API
import * as Chat from './chat'
import * as Chart from './chart'
export default {
  // chat
  getChatMenu: Chat.Menu,
  getChatGroup: Chat.Groups,
  getChatGroupById: Chat.getChatById,
  // chart data
  getMonthVisit: Chart.monthVisitData,
  getCampaign: Chart.campaignData,
  getLocation: Chart.locationData
}
