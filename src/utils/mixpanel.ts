// analytics/mixpanel.ts
import mixpanel from 'mixpanel-browser'
const token = '4477077ddd41acd976dd4ee5fc19c487'
mixpanel.init(token, { autocapture: true });
export default mixpanel;
