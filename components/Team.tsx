import { Art } from "@/components/Art";
import { Icon } from "@/components/Icon";
import { leadership } from "@/lib/site";

export function Team() {
  return (
    <section id="team" className="bg-page py-16 lg:py-20">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">The people behind the file</span>
            <h2 className="mt-5 text-4xl font-bold leading-[1.12] text-heading lg:text-[2.75rem]">
              You will know your advisor by name
            </h2>
          </div>
          <a href="#contact" className="btn btn-outline shrink-0 self-start md:self-auto">
            Talk to an advisor
            <Icon name="arrow-right" className="size-4" strokeWidth={2} />
          </a>
        </div>

        {/* Founders ----------------------------------------------------- */}
        <ul
          className={`mt-14 grid gap-6 ${
            leadership.length > 1 ? "md:grid-cols-2" : "max-w-2xl"
          }`}
        >
          {leadership.map((leader) => (
            <li
              key={leader.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:flex-row"
            >
              <div className="relative w-full shrink-0 overflow-hidden sm:w-44">
                <Art
                  variant={leader.art}
                  className="size-full min-h-40 object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-heading">
                  {leader.name}
                </h3>
                <p className="mt-1.5 text-[0.875rem] font-semibold text-brand-ink">
                  {leader.role}
                </p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-body">
                  {leader.bio}
                </p>
                <p className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  <Icon name="clock" className="size-3.5" />
                  {leader.tenure}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
