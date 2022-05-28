import { Types } from "../constants/actionTypes";

export const ActionCreators = {
  login: (user) => ({ type: Types.LOGIN, payload: { user } }),
};
