import EditorJS from "@editorjs/editorjs";
import type { EditorConfig } from "@editorjs/editorjs";

import Header from "@editorjs/header";
import List from "@editorjs/nested-list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Table from "editorjs-table";
import CodeBox from "@bomdi/codebox";
import SimpleImage from "simple-image-editorjs";
import TableOfContents from "./TableOfContents";
import { References } from "./Source";

import { Source } from "./Source";

import { listenForMessage, service } from "../router";
import { getImageData } from "../logic/dataHelper/getImageData";

try {
  const editorHolder = document.getElementById("editor") as HTMLElement;

  const editorConfig: EditorConfig = {
    holder: editorHolder,
    data: undefined as any,
    autofocus: true,
    tools: {
      header: Header,
      list: List,
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      image: SimpleImage,
      quote: Quote,
      marker: Marker,
      codeBox: CodeBox,
      toc: TableOfContents,
      references: References,
      source: Source,
    },
    tunes: ["source"],
  };

  let editor = new EditorJS(editorConfig);

  listenForMessage(service.getDocumentData, () => editor.save());
  listenForMessage(service.getSaveData, async () => {
    const saveData = await editor.save();

    for await (const blockData of saveData.blocks) {
      if (blockData.type === "image") {
        blockData.data.url = await (
          await getImageData(blockData.data.url)
        ).dataUrl;
      }
    }

    return {
      editor: saveData,
    };
  });
  listenForMessage(service.initFromData, (data) => {
    if (data.editor) {
      editorConfig.data = data.editor;
      editor.destroy();
      editor = editor = new EditorJS(editorConfig);
    }
  });
} catch (e) {
  console.warn(e);
}
