import mixpanel from "mixpanel-browser";

export const mixpanelEventName = {
  VIEW_PAGE: "VIEW_PAGE",
  CREATE_PAGE: "CREATE_PAGE",
  CREATE_NODE: "CREATE_NODE",
  CREATE_EDGE: "CREATE_EDGE",
  CREATE_USER: "CREATE_USER",
  CREATE_CHAT: "CREATE_CHAT",
};

export function generateMixpanelEvent(
  distinctId: string,
  eventName: string,
  properties: any
) {
  mixpanel.init(process.env.MIXPANEL_TOKEN as string);
  mixpanel.set_config({ persistence: "localStorage", debug: true });
  mixpanel.identify(distinctId);
  mixpanel.track(eventName, properties);
}
