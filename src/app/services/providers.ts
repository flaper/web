import {API_SERVICE_PROVIDER} from './ApiService';
import {PAGE_PROVIDER} from './helpers/PageService';
import {AUTH_SERVICE_PROVIDER} from './AuthService';
import {ACL_PROVIDER} from '../acl/ACL';
import {USER_SERVICE_PROVIDER} from './UserService';
import {METRIKA_PROVIDER} from './metrics/Metrika';
import {USER_SETTINGS_PROVIDER} from './UserSettings';
import {OBJECT_SERVICE_PROVIDER} from './object/ObjectService';
import {LIKE_SERVICE_PROVIDER} from './LikeService';
import {STORY_SERVICE_PROVIDER} from './story/StoryService';
import {STORY_BEST_SERVICE_PROVIDER} from './story/StoryBestService';
import {COMMENT_SERVICE_PROVIDER} from './CommentService';
import {IMAGE_SERVICE_PROVIDER} from './ImageService';
import {VIEW_SERVICE_PROVIDER} from './ViewService';
import {ACCOUNT_SERVICE_PROVIDER} from './AccountService';

// Include injectables that you want to have globally throughout our app
export let PROVIDERS:Array<any> = [
  API_SERVICE_PROVIDER,
  PAGE_PROVIDER,
  AUTH_SERVICE_PROVIDER,
  ACL_PROVIDER,
  USER_SERVICE_PROVIDER,
  METRIKA_PROVIDER,
  USER_SETTINGS_PROVIDER,
  OBJECT_SERVICE_PROVIDER,
  LIKE_SERVICE_PROVIDER,
  STORY_SERVICE_PROVIDER,
  STORY_BEST_SERVICE_PROVIDER,
  COMMENT_SERVICE_PROVIDER,
  IMAGE_SERVICE_PROVIDER,
  VIEW_SERVICE_PROVIDER,
  ACCOUNT_SERVICE_PROVIDER,
];
