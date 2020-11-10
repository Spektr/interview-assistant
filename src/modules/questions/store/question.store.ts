import {action, observable} from 'mobx';
import {Question} from '../shared/models/question';
import {RootStore} from '../../../store/root.store';
import {Tag} from '../../../shared/enums/tag';
import {Language} from '../../../shared/enums/language';
import {QuestionDto} from '../shared/dtos/question.dto';

export class QuestionStore {
    @observable initialized = false;
    @observable list: Question[] = [];
    @observable lang: Language = Language.En;
    @observable testableTags: Tag[] = [];

    constructor(private rootStore: RootStore) {
    }

    @action addTag(tag: Tag): void {
        if (this.initialized) {
            return;
        }

        if (this.testableTags.includes(tag)) {
            return;
        }

        this.testableTags.push(tag);
    }

    @action removeTag(tag: Tag): void {
        if (this.initialized) {
            return
        }

        const index = this.testableTags.indexOf(tag);
        this.testableTags.splice(index, 1);
    }

    @action setLang(lang: Language): void {
        if (this.initialized) {
            return
        }

        this.lang = lang;
    }

    @action populateList(dtos: QuestionDto[]): void {
        dtos.forEach((dto) => {
            const model = new Question(this);
            model.updateFromDto(dto);
            this.list.push(model);
        });
    }

    @action loadTags(): void {
        Promise
            .all(this.testableTags
                .map((tag) => import(`../../db/${this.lang.toLowerCase()}/${tag.toLowerCase()}`))
            )
            .then((modules: any) => modules.map((item: any) => item.default).flat())
            .then((dtos: QuestionDto[]) => this.populateList(dtos))
            .finally(() => {
                this.initialized = true;
            })
            .catch(console.log);
    }

    @action unloadTag(tag: Tag): void {
        this.list = this.list.filter((item) => !item.tags.includes(tag));
    }
}
