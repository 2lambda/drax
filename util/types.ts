export type appType =
    | "web"
    | "mobile"
    | "desktop"
    | "display"
    | "bot"
    | "agent"
    | "other";

export type request = {
    method: string;
    params?: unknown;
};
