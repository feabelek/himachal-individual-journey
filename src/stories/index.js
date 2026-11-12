import {
  CASE_STUDIES,
  CHAPTER_DIALOGUES,
  IMAGES,
  STORY,
  HIMACHAL_LOCATIONS
} from './himachal.js';
import {
  ELEVATION_RANGES,
  SEASON_COLORS,
  SEASON_CYCLES
} from './seasons.js';
import { HIMACHAL_CONCLUSION } from './conclusion.js';


export const STORY_REGISTRY = {
  himachal: {
    id: 'himachal',
    caseStudies: CASE_STUDIES,
    chapters: STORY,
    dialogues: CHAPTER_DIALOGUES,
    images: IMAGES,
    seasons: SEASON_CYCLES.himachal,
    elevationRange: ELEVATION_RANGES.himachal,
    conclusion: HIMACHAL_CONCLUSION
  }
};


export {
  CASE_STUDIES,
  CHAPTER_DIALOGUES,
  IMAGES,
  HIMACHAL_LOCATIONS,
  STORY,
  SEASON_COLORS,
  SEASON_CYCLES,
  ELEVATION_RANGES,
  HIMACHAL_CONCLUSION
};
