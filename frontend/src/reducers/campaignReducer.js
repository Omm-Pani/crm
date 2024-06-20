export function campaignReducer(state, action) {
  switch (action.type) {
    case "CAMPAIGN_REQUEST":
      return { ...state, loading: true, error: "" };
    case "CAMPAIGN_SUCCESS":
      return {
        ...state,
        loading: false,
        campaigns: action.payload,
        error: "",
      };
    case "CAMPAIGN_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
