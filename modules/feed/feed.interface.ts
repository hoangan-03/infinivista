import {BaseEntity} from '../common.interface';
import {FEED_VISIBILITY} from './feed.enum';

export interface IFeed extends BaseEntity {
    id: string;
    visibility: FEED_VISIBILITY;
    owner_id: string;
}
