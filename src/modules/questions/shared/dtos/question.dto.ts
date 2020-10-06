import {Language} from '../../../../shared/enums/language';
import {Tag} from '../../../../shared/enums/tag';

export interface QuestionDto {
    text: string;
    answers: {
        score: number;
        text: string;
    }[];
    links: string[];
    language: Language;
    tags: Tag[];
    difficulty: number;
}
