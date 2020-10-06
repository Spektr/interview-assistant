import {observable, computed} from 'mobx';
import {QuestionStore} from '../../store/question.store';
import {QuestionDto} from '../dtos/question.dto';
import {Language} from '../../../../shared/enums/language';
import {Tag} from '../../../../shared/enums/tag';
import {Difficulty} from '../../../../shared/enums/difficulty';

export class Question {
    @observable correctAnswers: number[] = [];

    @computed get toDto(): QuestionDto {
        return {
            text: this.text,
            answers: this.answers,
            links: this.links,
            language: this.language,
            tags: this.tags,
            difficulty: this.difficulty,
        };
    }

    text = '';
    answers: {
        score: number;
        text: string;
    }[] = [];
    links: string[] = [];
    language = Language.En;
    tags: Tag[] = [];
    difficulty: number = Difficulty.Junior;

    constructor(private store: QuestionStore) {
    }

    updateFromDto(dto: QuestionDto): void {
        this.text = dto.text;
        this.answers = dto.answers;
        this.links = dto.links;
        this.language = dto.language;
        this.tags = dto.tags;
        this.difficulty = dto.difficulty;
    }
}
