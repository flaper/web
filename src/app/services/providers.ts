import {API_SERVICE_PROVIDER} from './ApiService';
import {AUTH_SERVICE_PROVIDER} from './AuthService';
import {ACL_PROVIDER} from '../acl/ACL';
import {USER_SERVICE_PROVIDER} from './UserService';
import {USER_SETTINGS_PROVIDER} from './UserSettings';
import {STORY_SERVICE_PROVIDER} from './story/StoryService';
import {STORY_BEST_SERVICE_PROVIDER} from './story/StoryBestService';
import {COMMENT_SERVICE_PROVIDER} from './CommentService';
import {IMAGE_SERVICE_PROVIDER} from './ImageService';
import {LIKE_SERVICE_PROVIDER} from './LikeService';
import {VIEW_SERVICE_PROVIDER} from './ViewService';
import {ACCOUNT_SERVICE_PROVIDER} from './AccountService';
import {PAGE_PROVIDER} from './helpers/PageService';

// Include injectables that you want to have globally throughout our app
export let APP_PROVIDERS:Array<any> = [
  API_SERVICE_PROVIDER,
  AUTH_SERVICE_PROVIDER,
  ACL_PROVIDER,
  USER_SERVICE_PROVIDER,
  STORY_SERVICE_PROVIDER,
  STORY_BEST_SERVICE_PROVIDER,
  IMAGE_SERVICE_PROVIDER,
  COMMENT_SERVICE_PROVIDER,
  LIKE_SERVICE_PROVIDER,
  VIEW_SERVICE_PROVIDER,
  ACCOUNT_SERVICE_PROVIDER,
  USER_SETTINGS_PROVIDER,
  PAGE_PROVIDER
];
