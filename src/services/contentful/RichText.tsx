import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import {
  Options,
  RenderMark,
  RenderNode,
} from "@contentful/rich-text-react-renderer";

const renderNode: RenderNode = {
  [BLOCKS.DOCUMENT]: (node, children) => <div>{children}</div>,
  [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  [BLOCKS.HEADING_1]: (node, children) => (
    <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{children}</h1>
  ),
  [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
  [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
  [BLOCKS.HEADING_4]: (node, children) => (
    <h4 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{children}</h4>
  ),
  [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
  [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
  [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
  [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
  [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
  [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
  [BLOCKS.HR]: () => <hr />,
  [BLOCKS.TABLE]: (node, children) => <table>{children}</table>,
  [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
  [BLOCKS.TABLE_CELL]: (node, children) => <td>{children}</td>,
  [BLOCKS.TABLE_HEADER_CELL]: (node, children) => <th>{children}</th>,
  [BLOCKS.EMBEDDED_ENTRY]: (node) => (
    <iframe title="embed_entry" src={node.data.target.fields.file.url} />
  ),
  [BLOCKS.EMBEDDED_ASSET]: (node) => (
    <img alt="" src={node.data.target.fields.file.url} />
  ),
  [BLOCKS.EMBEDDED_RESOURCE]: (node) => (
    <iframe title="embed_resource" src={node.data.target.fields.file.url} />
  ),

  [INLINES.HYPERLINK]: (node, children) => (
    <a href={node.data.uri}>{children}</a>
  ),
  [INLINES.ENTRY_HYPERLINK]: (node, children) => (
    <a href={node.data.target.sys.id}>{children}</a>
  ),
  [INLINES.EMBEDDED_ENTRY]: (node) => (
    <iframe title="embed_entry" src={node.data.target.fields.file.url} />
  ),
  [INLINES.ASSET_HYPERLINK]: (node, children) => (
    <a href={node.data.target.fields.file.url}>{children}</a>
  ),
};

const renderMark: RenderMark = {
  [MARKS.BOLD]: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
  [MARKS.ITALIC]: (text) => <span style={{ fontStyle: "italic" }}>{text}</span>,
  [MARKS.UNDERLINE]: (text) => (
    <span style={{ textDecoration: "underline" }}>{text}</span>
  ),
  [MARKS.CODE]: (text) => <code>{text}</code>,
  [MARKS.SUPERSCRIPT]: (text) => <sup>{text}</sup>,
  [MARKS.SUBSCRIPT]: (text) => <sub>{text}</sub>,
};

const richTextOptions: Options = { renderNode, renderMark };

export { richTextOptions };
