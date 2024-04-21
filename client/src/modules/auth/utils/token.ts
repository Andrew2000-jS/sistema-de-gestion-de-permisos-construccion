import jwt from "jsonwebtoken";


export const generateToken = (email) => {
    const token = jwt.sign({ email }, '3g8rgz4G7NH4');
    return token
}