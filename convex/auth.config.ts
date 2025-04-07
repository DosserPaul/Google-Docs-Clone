// eslint-disable-next-line import/no-anonymous-default-export
export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CONVEX_API_CLERK_URL!,
      applicationID: "convex",
    },
  ]
};
