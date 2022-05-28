import { Types } from "../constants/actionTypes";

const initialState = {
  profile: {
    firstName: "",
    lastName: "",
    telephone: "",
    age: 28,
    email: "",
    state: "",
    country: "",
    address: "Home",
    address1: "",
    address2: "",
    interests: [],
    profileImage: "",
    subscribenewsletter: false,
  },
  formSubmitted: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      console.log("login", action.payload.user);
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false, // after update user form submission reset
      };
    default:
      return state;
  }
};

export default reducer;
