import type { BlockAPI, BlockTool } from "@editorjs/editorjs";
import type { IReferencesData } from "./IReferencesData";

export default class References implements BlockTool {
  api: BlockAPI;
  data: IReferencesData;
  isReadOnlySupported = true;

  constructor(config?: { data: IReferencesData; api: any }) {
    if (config) {
      this.api = config.api;
      this.data = config.data;
    } else {
      throw new Error("Config is needed!");
    }
  }

  save(block: HTMLInputElement): IReferencesData {
    return {
      title: block.innerText,
    };
  }
  render(): HTMLElement {
    const ref = document.createElement("div");
    ref.classList.add("ce-references");
    ref.setAttribute("data-placeholder", "true");
    ref.spellcheck = true;
    ref.contentEditable = "true";
    ref.innerText = this.data.title || "References";
    return ref;
  }

  static get toolbox() {
    return {
      title: "References/Sources",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18L4,18V6h5.17 l2,2H20V18z M18,12H6v-2h12V12z M14,16H6v-2h8V16z"/></g></svg>',
    };
  }
}
