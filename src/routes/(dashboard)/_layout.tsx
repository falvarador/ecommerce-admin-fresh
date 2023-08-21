import { Handlers, LayoutProps } from "$fresh/server.ts";

export const handler: Handlers<Project> = {
  async GET(_req, ctx) {
    const project = await db.projects.findOne({ id: ctx.params.id });
    if (!project) {
      return new Response("Project not found", { status: 404 });
    }
    return ctx.render(project);
  },
};

export default function Layout({ Component }: LayoutProps) {
  return (
    <>
      <nav>This will be a navbar</nav>
      <Component />
    </>
  );
}
