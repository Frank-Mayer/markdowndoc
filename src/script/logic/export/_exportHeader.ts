import type { OutputBlockData } from "@editorjs/editorjs";
import type { Content } from "pdfmake/interfaces";
import type { IExportHelper } from "./ExportHelper";
import { parseHtml } from "./html/parseHtml";

type headerLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface IHeaderData {
  text: string;
  level: headerLevel;
}

export class ExportHeader implements IExportHelper<IHeaderData> {
  public fulfillsSchema(block: OutputBlockData<string, IHeaderData>): boolean {
    return block.type === "header";
  }

  public parse(block: OutputBlockData<"header", IHeaderData>): Content {
    if (block.id) {
      return {
        id: block.id,
        text: parseHtml(block.data.text),
        ...(this.getStyle(block.data.level) as any),
      };
    }

    return {
      text: parseHtml(block.data.text),
      ...(this.getStyle(block.data.level) as any),
    };
  }

  private getStyle(level: headerLevel): Partial<Content> & object {
    switch (level) {
      case 1:
        return {
          tocStyle: "toc_header1",
          style: "header1",
          tocItem: "toc",
        };
      case 2:
        return {
          tocStyle: "toc_header2",
          style: "header2",
          tocItem: "toc",
        };
      case 3:
        return {
          tocStyle: "toc_header3",
          style: "header3",
          tocItem: "toc",
        };
      case 4:
        return {
          style: "header4",
        };
      case 5:
        return {
          style: "header5",
        };
      case 6:
        return {
          style: "header6",
        };
      default:
        throw new Error("Invalid header level");
    }
  }
}
