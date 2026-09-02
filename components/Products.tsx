import { Art } from "@/components/Art";
import { Icon } from "@/components/Icon";
import { products } from "@/lib/site";

export function Products() {
  return (
    <section id="products" className="bg-surface-alt py-16 lg:py-20">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">What we lend</span>
            <h2 className="mt-5 text-4xl font-bold leading-[1.12] text-heading lg:text-[2.75rem]">
              Eight products, one application
            </h2>
          </div>
          <a href="#apply" className="btn btn-outline shrink-0 self-start md:self-auto">
            Compare all products
            <Icon name="arrow-right" className="size-4" strokeWidth={2} />
          </a>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li
              key={product.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-lift"
            >
              <div className="relative aspect-[4/2.6] overflow-hidden">
                <Art
                  variant={product.art}
                  className="size-full transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <span className="absolute right-3.5 top-3.5 rounded-lg bg-surface/92 px-2.5 py-1.5 text-xs font-semibold text-brand-ink shadow-sm backdrop-blur-sm">
                  {product.ceiling}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-heading">
                  {product.name}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {product.tenure}
                </p>

                <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Funded by
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {product.banks.map((bank) => (
                    <li
                      key={bank}
                      className="rounded-md bg-tint px-2 py-1 text-[0.6875rem] font-semibold leading-tight text-brand-ink"
                    >
                      {bank}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {product.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[0.9375rem] text-body"
                    >
                      <Icon
                        name="check"
                        className="mt-0.5 size-4 shrink-0 text-brand-600"
                        strokeWidth={2.4}
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href="#apply"
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-ink transition-colors hover:text-accent-600"
                >
                  Apply for this
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
