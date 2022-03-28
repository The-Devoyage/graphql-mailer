import handlebars from "handlebars";
import { Content } from "types/generated";

export const Generate = (generateArgs: {
  content:
    | Omit<
        Content,
        | "_id"
        | "name"
        | "created_by"
        | "createdAt"
        | "updatedAt"
        | "trigger"
        | "active"
      >
    | undefined;
  contentVariables?: Record<string, unknown>;
}): Partial<Content> => {
  const { content, contentVariables } = generateArgs;
  let html: string | undefined = content?.html;

  if (content?.layout) {
    html = content.layout.html.replace("{{content}}", content.html);
  }

  const contentTemplate = handlebars.compile(html);
  html = contentTemplate(contentVariables);

  const contentPlainTextTemplate = handlebars.compile(content?.plainText);
  const plainText = contentPlainTextTemplate(contentVariables);

  return { ...content, html, plainText };
};
