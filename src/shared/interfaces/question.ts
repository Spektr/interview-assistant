import {Language} from "../enums/language";
import {Tag} from "../enums/tag";

export interface Question {
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