import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const request = (await req.json()) as { role?: string | null };
  console.log({ request });

  const cookieData = request.role ?? "USER";
  console.log({ cookieData });

  cookies().set("role", cookieData);

  return Response.json({ message: "Role set" });
};
