import { Content } from "types/generated";
export type ObjectID = string;

export interface DefaultContent {
  to: string;
  subject: string;
  html: string;
  plainText: string;
  layout?: ObjectID;
}

export interface TriggeredContent {
  trigger: string;
  variables?: Record<string, any>;
  to: string;
}

export interface SendArgs {
  triggeredContent?: TriggeredContent;
  defaultContent: DefaultContent;
}

export interface UseTriggeredContent extends TriggeredContent {
  content:
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
    | undefined;
  trigger?: string;
}
