import jwt from "jsonwebtoken";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function decodeToken(token): any  {
  console.log('token', token)
  try {
    return jwt.verify(token, "3g8rgz4G7NH4");
  } catch (error) {
    console.log("Error decoding token:", error);
    return null;
  }
}
