import { Mailer } from "@src/mailer";
import { Content, Layout } from "@src/models";
import express, { Request, Response } from "express";
import {
  DefaultContent,
  MailerPostResponse,
  SendArgs,
  TriggeredContent,
  UseTriggeredContent,
} from "types/mailer";
import { Content as IContent, Layout as ILayout } from "types/generated";

export const MailerRouter = express.Router({ strict: true });

const useTriggeredContent = async (
  triggeredContent: TriggeredContent
): Promise<UseTriggeredContent> => {
  try {
    const foundContent = await Content.findOne<IContent>({
      trigger: triggeredContent.trigger,
      active: true,
    }).populate("layout");

    return { ...triggeredContent, content: foundContent };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useDefaultContent = async (defaultContent: DefaultContent) => {
  let layout: ILayout | undefined | null = undefined;

  if (defaultContent.layout) {
    layout = await Layout.findOne({ _id: defaultContent.layout });
  }

  const content = {
    html: defaultContent.html,
    subject: defaultContent.subject,
    layout: layout,
    plainText: defaultContent.plainText,
  };

  return { ...defaultContent, layout, content };
};

MailerRouter.post("/", async (req: Request, res: Response) => {
  const { triggeredContent, defaultContent }: SendArgs = req.body;

  if (!defaultContent) {
    return res.json({
      ok: false,
      error: "Default Content is Required.",
    } as MailerPostResponse);
  }

  try {
    let content:
      | Omit<
          IContent,
          | "_id"
          | "name"
          | "created_by"
          | "createdAt"
          | "updatedAt"
          | "trigger"
          | "active"
        >
      | undefined
      | null;
    let variables: Record<string, unknown> | undefined;
    let to = "";

    if (triggeredContent) {
      let generated = await useTriggeredContent(triggeredContent);

      if (!generated.content) {
        generated = await useDefaultContent(defaultContent);
      }

      to = generated.to;
      content = generated.content;
      variables = generated.variables;
    } else {
      const generated = await useDefaultContent(defaultContent);
      to = generated.to;
      content = generated.content;
    }

    if (!content) {
      return res.json({
        ok: false,
        error: "Content missing.",
      } as MailerPostResponse);
    }

    const generated = Mailer.Generate({
      content,
      contentVariables: variables,
    });

    const mailed = await Mailer.Send({
      content: generated,
      to,
    });

    res.json({ ok: true, info: mailed } as MailerPostResponse);
  } catch (error) {
    console.log(error);
    res.json({ ok: false });
  }
});
