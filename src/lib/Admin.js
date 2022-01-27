const isAdmin = () => {
    return !!sessionStorage.getItem("nickname");
  };
  
  export default isAdmin;