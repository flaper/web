import {Component} from "@angular/core";
@Component({
  selector: "question-list",
  styles: [require("./QuestionList.scss")],
  template: require("./QuestionList.html")
})

export class QuestionList {
  records = [
    {title:"текст текст текст",
      type: "poll",
      status: "active",
      answers: [
        {text:"вариант ответа",count:0},
        {text:"вариант ответа",count:1},
        {text:"вариант ответа",count:2},
        {text:"вариант ответа",count:3}
      ],
      userId: "57bc8917a5db9b354a007737",
      id: "123",
      created: "14124124"
    },

    {title:"текст текст текст",
      type: "question",
      status: "active",
      answers: [
        {text:"Да",count:0},
        {text:"Нет",count:1}
      ],
      userId: "57bc8917a5db9b354a007737",
      id: "345",
      created: "14124124"
    },

    {title:"текст текст текст",
      type: "poll",
      status: "active",
      answers: [
        {text:"вариант ответа",count:0},
        {text:"вариант ответа",count:1},
        {text:"вариант ответа",count:2},
        {text:"вариант ответа",count:3}
      ],
      userId: "57bc8917a5db9b354a007737",
      id: "123",
      created: "14124124"
    }
  ];
  constructor() {

  }

}
