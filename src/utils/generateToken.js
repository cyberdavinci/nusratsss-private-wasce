const generateToken = () => {
  const characters = "0123456789";
  const tokenLength = 6;

  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
};
export default generateToken;
