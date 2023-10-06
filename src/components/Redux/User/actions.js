export const userDataFetchStart = () => ({
  type: 'user_data_fetch_start',
});
export const userDataFetchEnd = () => ({
  type: 'user_data_fetch_end',
});
export const userLogin = (userData) => ({
  type: 'user_login',
  payload: userData.user,
});
export const userLogout = () => ({
  type: 'user_logout',
});
export const userInputError = () => ({
  type: 'user_login_error',
});
export const deleteArticleConfirm = () => ({
  type: 'delete_confirm',
});
