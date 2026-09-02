import { Icon } from "@/components/Icon";
import { company } from "@/lib/site";

/**
 * Floating WhatsApp button. Sits above page content but below the mobile
 * drawer (z-50) so the drawer's overlay still covers it when open.
 */
export function WhatsAppFab() {
  return (
    <a
      href={company.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${company.name} Capital on WhatsApp`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25d366] p-4 text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.6)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105 sm:bottom-7 sm:right-7"
    >
      <Icon name="whatsapp-solid" className="size-7 shrink-0" />
      <span className="hidden pr-1 text-[0.9375rem] font-semibold leading-none lg:group-hover:inline lg:group-focus-visible:inline">
        Chat with us
      </span>
    </a>
  );
}
