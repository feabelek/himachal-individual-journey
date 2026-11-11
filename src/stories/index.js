import {
  CASE_STUDIES,
  CHAPTER_DIALOGUES,
  IMAGES,
  STORY
} from './himachal.js';
import {
  ELEVATION_RANGES,
  SEASON_COLORS,
  SEASON_CYCLES
} from './seasons.js';


export const STORY_REGISTRY = {
  himachal: {
    id: 'himachal',
    caseStudies: CASE_STUDIES,
    chapters: STORY,
    dialogues: CHAPTER_DIALOGUES,
    images: IMAGES,
    seasons: SEASON_CYCLES.himachal,
    elevationRange: ELEVATION_RANGES.himachal
  }
};


export {
  CASE_STUDIES,
  CHAPTER_DIALOGUES,
  IMAGES,
  STORY,
  SEASON_COLORS,
  SEASON_CYCLES,
  ELEVATION_RANGES
};
