import { Context, Callback } from 'aws-lambda'

async function handler (event: any, context: Context, callback: Callback) {
  const response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        userId: '1234'
      }
    }
  }

  callback(null, event)
}

export { handler }
