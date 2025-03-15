export const capitalizeName=(name)=>{
  if(name){
    let word = name.split("")
    word[0] = word[0].toUpperCase()
    return word.join("")
  }
}

export const  validateUsername = (username)=> {
  username = username.trim(); 

  const usernameRegex = /^[a-zA-Z0-9_]+$/;

  if (!usernameRegex.test(username)) {
      return false;
  }
  return true
}

export const validateEmail=(email)=> {
  email = email.trim(); 

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
      return false;
  }
  return true
}




