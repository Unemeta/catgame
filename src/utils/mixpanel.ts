// analytics/mixpanel.ts
import mixpanel from 'mixpanel-browser'
const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ? process.env.NEXT_PUBLIC_MIXPANEL_TOKEN : '';
mixpanel.init(token, { autocapture: true });
export default mixpanel;
