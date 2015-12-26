import {API_SERVICE_PROVIDER} from './ApiService';
import {AUTH_SERVICE_PROVIDER} from './AuthService';
import {USER_SERVICE_PROVIDER} from './UserService';
import {STORY_SERVICE_PROVIDER} from './StoryService';
import {COMMENT_SERVICE_PROVIDER} from './CommentService';
import {IMAGE_SERVICE_PROVIDER} from './ImageService';
import {ACL_PROVIDER} from '../acl/ACL';

// Include injectables that you want to have globally throughout our app
export let APP_PROVIDERS:Array<any> = [
  API_SERVICE_PROVIDER,
  AUTH_SERVICE_PROVIDER,
  USER_SERVICE_PROVIDER,
  STORY_SERVICE_PROVIDER,
  IMAGE_SERVICE_PROVIDER,
  COMMENT_SERVICE_PROVIDER,
  ACL_PROVIDER
];
