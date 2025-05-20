import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Path to your service account key
const keyFilePath = path.resolve('path-to-json/dialogflow-key.json');

const projectId = 'your-project-id';
const sessionId = uuidv4();

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: keyFilePath,
});

export const detectIntent = async (queryText) => {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult;
};
