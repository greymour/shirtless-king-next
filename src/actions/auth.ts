'use server'
import db from '@/data/DB'
import { InsertSession, User, sessions, users } from '../../db/schema'
import { eq } from 'drizzle-orm';

export type AuthPayload = {
  userId: number;
  sessionCookie: string;
}

export type SignInPayload = {
  email: string;
  password: string;
}

export type SignInSuccessPayload = {
  sessionUuid: string;
}

// @TODO: idk I'm returning status codes from these which I'm not sure if that's what I should be doing??? NextJS is fucking weird now???

// flow: 
// user submits sign in request, we get their email + password
// hash pw on client? send email + hashed pw to endpoint
// do lookup in db for that email, if user doesn't exist return a 400
// if user does exist, check pw against hashed pw in db
// check passes? we create a new session and assign a cookie w/ the session uuid
// check fails? we hit 'em with a 401 error baybee
// maybe do some IP address checking <- do this later
export async function signIn({ email, password }: SignInPayload) {
  const [user] = await db.select().from(users).where(eq(users.email, email))
  if (!user) {
    return 400;
  }
  if (user.email !== email) {
    return 401;
  }
  const [newSession] = await db.insert(sessions).values({}).returning();
 
  if (user.sessionId) {
    const [oldSession] = await db.select().from(sessions).where(eq(sessions.id, user.sessionId));
    if (!oldSession.isExpired) {
      await db.update(sessions).set({isExpired: true}).where(eq(sessions.id, oldSession.id))
    }
  }
  await db.update(users).set({sessionId: newSession.id}).where(eq(users.email, email));
  return 200
}

export async function authenticate(payload: AuthPayload) {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, payload.userId))
    if (!user) {
      return 400;
    }
    // raise an error if multiple sessions have the same uuid
    const [session] = await db.select().from(sessions).where(eq(sessions.uuid, payload.sessionCookie))
    if (!session) {
      return 400;
    }

    // might want to return a 400 here for obscurity's sake - don't inform bad actors that they have some kind of correct user id/session token
    if (user.sessionId !== session.id) {
      return 401
    }
    return 200
  } catch (e) {
    return 500
  }
}

export async function signOut(payload: AuthPayload) {
    const [user] = await db.select().from(users).where(eq(users.id, payload.userId))
    if (!user) {
      return 400;
    }
    // raise an error if multiple sessions have the same uuid
    const [session] = await db.select().from(sessions).where(eq(sessions.uuid, payload.sessionCookie))
    if (!session) {
      return 400;
    }

    // might want to return a 400 here for obscurity's sake - don't inform bad actors that they have some kind of correct user id/session token
    if (user.sessionId !== session.id) {
      return 401
    }

    await db.update(sessions).set({isExpired: true}).where(eq(sessions.id, session.id));
    return 200
}