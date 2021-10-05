const ROOT_URL = 'https://mighty-oasis-08080.herokuapp.com/api/';
const articlesURL =
  // eslint-disable-next-line no-useless-concat
  'https://mighty-oasis-08080.herokuapp.com/api/articles';
const TAG_URL = ROOT_URL + 'tags';
const SIGNUP_URL = ROOT_URL + 'users';
const SIGNIN_URL = ROOT_URL + 'users/login';
const USER_VERIFY_URL = ROOT_URL + 'user';
const POST_NEW_ARTICLE = ROOT_URL + 'articles';
const UPDATE_PROFILE = ROOT_URL + 'user';
const FEED_ARTICLES = articlesURL + '/feed';
const USER_PROFILES = ROOT_URL + 'profiles/';
export {
  ROOT_URL,
  articlesURL,
  TAG_URL,
  SIGNUP_URL,
  SIGNIN_URL,
  USER_VERIFY_URL,
  POST_NEW_ARTICLE,
  UPDATE_PROFILE,
  FEED_ARTICLES,
  USER_PROFILES,
};
