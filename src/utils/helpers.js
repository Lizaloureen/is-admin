export const getUser = () => {
    let userData =
      localStorage.getItem("isAdminTokenData") !== ""
        ? JSON.parse(localStorage.getItem("isAdminTokenData"))
        : null;
  
    if (userData !== null) {
      return userData;
    } else {
      window.location.href = "/login";
    }
  };