"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account, database } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.log("Error", error);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;

  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    // Set the session cookie with the secret
    cookies().set("appwrite-session", session.secret, {
      sameSite: "strict",
      expires: new Date(session.expire),
      secure: true,
      path: "/",
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");
    await account.deleteSession('current')
  } catch (error) {
    return null;
  }
};
