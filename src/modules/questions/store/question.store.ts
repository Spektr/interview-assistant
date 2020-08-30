import {action, observable} from "mobx";
import {Question} from "../shared/models/question";
import {RootStore} from "../../../store/root.store";
import {Tag} from "../../../shared/enums/tag";
import {Language} from "../../../shared/enums/language";
import {QuestionDto} from "../shared/dtos/question.dto";

export class QuestionStore {
    @observable list: Question[] = [];
    @observable lang: Language = Language.En;

    constructor(private rootStore: RootStore) {
    }

    @action setLang(lang: Language): void {
        this.lang = lang;
    }

    @action populateList(dtos: QuestionDto[]): void {
        dtos.forEach((dto) => {
            const model = new Question(this);
            model.updateFromDto(dto);
            this.list.push(model);
        })
    }

    @action loadTag(tag: Tag): void {
        import(`../../db/${this.lang.toLowerCase()}/${tag.toLowerCase()}`)
            .then((module) => {
                this.unloadTag(tag);
                this.populateList(module.default);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    @action unloadTag(tag: Tag): void {
        this.list = this.list.filter((item) => !item.tags.includes(tag));
    }
}