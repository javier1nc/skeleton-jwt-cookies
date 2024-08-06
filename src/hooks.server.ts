import { serialize, parse } from "cookie";


export const handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;
  const cookies = parse(headers.get("cookie") ?? "");

  if (cookies.AuthorizationToken) {
    // Remove Bearer prefix
    const token = cookies.AuthorizationToken.split(" ")[1];

    try {
      const jwtUser = jwt.verify(token, import.meta.env.VITE_JWT_ACCESS_SECRET);
      if (typeof jwtUser === "string") {
        throw new Error("Something went wrong");
      }

      const user = await db.user.findUnique({
        where: {
          id: jwtUser.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const sessionUser: SessionUser = {
        id: user.id,
        email: user.email,
      };

      event.locals.user = sessionUser;
    } catch (error) {
      console.error(error);
    }
  }

  return await resolve(event);
};

