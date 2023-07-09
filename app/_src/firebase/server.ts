import admin from 'firebase-admin'
import { type App, cert } from 'firebase-admin/app'

const app: App =
  admin.apps.length === 0
    ? admin.initializeApp({
        credential: cert({
          projectId: process.env.GCP_PROJECT_ID,
          clientEmail: process.env.GCP_CLIENT_EMAIL,
          privateKey: process.env.GCP_PRIVATE_KEY,
        }),
      })
    : (admin.apps[0] as App)

export const getServerAuth = () => admin.auth(app)
export const serverCollection = admin
  .firestore(app)
  .collection(process.env.DEV_FIRESTORE_COLLECTION ?? 'hot-cook')
