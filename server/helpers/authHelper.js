import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    return hashedPassword
  } catch (error) {
    console.log(`Error while password hashing ${error.messsage}`);
  }
};

export const comparePassword = async (password, hashedPassword) => {

  try {

    return bcrypt.compare(password,hashedPassword)
  } 
  catch (error) {
    console.log(`Error while comparing password ${error.message}`);
  }
};
