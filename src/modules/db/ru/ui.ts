import {QuestionDto} from "../../questions/shared/dtos/question.dto";
import {Language} from "../../../shared/enums/language";
import {Difficulty} from "../../../shared/enums/difficulty";
import {Tag} from "../../../shared/enums/tag";

const questions: QuestionDto[] = [{
    text: 'я ебашу гусей',
    difficulty: Difficulty.Junior,
    links: ['www.learn.javascript.ru'],
    tags: [Tag.UI],
    language: Language.Ru,
    answers: [{score: 3, text: 'ебаш дальше'}, {score: 1, text: 'перестань ебашить'},]
}];

export default questions;