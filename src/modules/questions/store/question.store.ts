import {action, observable} from "mobx";
import {Question} from "../shared/models/question";
import {RootStore} from "../../../store/root.store";
import {Tag} from "../../../shared/enums/tag";
import {Language} from "../../../shared/enums/language";
import {QuestionDto} from "../shared/dtos/question.dto";

export class QuestionStore {
    @observable list: Question[] = [];
    @observable lang: Language = Language.En;
    @observable testableTags: Tag[] = [];

    constructor(private rootStore: RootStore) {
    }

    @action testTag(tag: Tag): void {
        if (this.testableTags.includes(tag)) {
            return;
        }
        this.testableTags.push(tag);
    }

    @action untestTag(tag: Tag): void {
        const index = this.testableTags.indexOf(tag);
        this.testableTags.splice(index, 1);
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

    @action loadTags(): void {
        const getPath = (tag: Tag) => `../../db/${this.lang.toLowerCase()}/${tag.toLowerCase()}`;

        // this.testableTags
        //     .forEach((tag) => {
        //         import(`../../db/${this.lang.toLowerCase()}/${tag.toLowerCase()}`)
        //             .then((item: any) => item.default)
        //             .then((dtos: QuestionDto[]) => this.populateList(dtos))
        //             .catch(console.log);
        //     });

        Promise
            .all(this.testableTags
                .map((tag) => import(`../../db/${this.lang.toLowerCase()}/${tag.toLowerCase()}`))
            )
            .then((modules: any) => modules.map((item: any) => item.default).flat())
            .then((dtos: QuestionDto[]) => this.populateList(dtos))
            .catch(console.log);
    }

    @action unloadTag(tag: Tag): void {
        this.list = this.list.filter((item) => !item.tags.includes(tag));
    }
}