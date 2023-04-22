import md5 from "md5";

export function hash(rawPassword: string, options: any) {
  const salt = options.salt ? options.salt : new Date().getTime();
  const rounds = options.rounds ? options.rounds : 10;

  let hashed = md5(rawPassword + salt);
  for (let i = 0; i <= rounds; i++) {
    hashed = md5(hashed);
  }
  return `${salt}$${rounds}$${hashed}`;
}

export function compare(rawPassword: string, hashedPassword: string) {
  try {
    const [salt, rounds] = hashedPassword.split("$");
    const hashedRawPassword = hash(rawPassword, { salt, rounds });
    return hashedPassword === hashedRawPassword;
  } catch (error: any) {
    throw Error(error.message);
  }
}
