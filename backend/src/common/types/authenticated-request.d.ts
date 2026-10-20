export type AuthenticatedRequest = Request & {
  user: {
    userId: UUID;
    email: string;
  };
};