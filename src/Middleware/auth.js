import { getSession } from "next-auth/react";

export default async function authorizeUser(req, res, next) {
  const session = await getSession({ req });
  console.log(req);
}
