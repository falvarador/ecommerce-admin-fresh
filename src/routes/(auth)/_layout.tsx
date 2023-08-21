import { LayoutProps } from "$fresh/server.ts";

export default function Layout({ Component }: LayoutProps) {
  return (
    <section className="flex items-center justify-center h-full">
      <Component />
    </section>
  );
}
