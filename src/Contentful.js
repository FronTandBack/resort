// import dotenv from 'dotenv';
import { createClient } from 'contentful';
// console.log(require('dotenv').config());

export default createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'v39n6dv3hwuj',
  // space: REACT_APP_API_SPACE,

  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'O4-907snYAqu5kOqwfFcG1N3rEShaEFJW1smc7xRyUo'
  // accessToken: REACT_APP_API_TOKEN
});
