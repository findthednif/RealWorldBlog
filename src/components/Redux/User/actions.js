export const userDataFetchStart = () =>{
  return{
    type: 'user_data_fetch_start'
  }
}
export const userDataFetchEnd = () =>{
  return{
    type:'user_data_fetch_end'
  }
}
export const userLogin = (userData) => {
    return {
      type: "user_login",
      payload: userData.user,
    };
  };
  export const userLogout = () => {
    return {
      type: "user_logout",
    };
  };
  export const userInputError = () => {
    return {
      type: "user_login_error",
    };
  };