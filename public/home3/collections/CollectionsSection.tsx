import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { BUSINESS_INFO, COLLECTIONS, IronCollection } from './ornateCatalog';
import { CollectionFriezeRule } from './IronworkMotifs';

const CollectionCard: React.FC<{
  item: IronCollection;
  revealed: boolean;
}> = ({ item, revealed }) => {
  const [inspecting, setInspecting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const showDetail = inspecting || hovered;

  return (
    <article
      className={`${item.spanClass} group relative bg-[#191F25] platinum-edge-border flex flex-col justify-between transition-colors duration-200 hover:border-[#D6DCE2]/28`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Editorial Image Container with Ironwork Arch-Aperture Scroll Reveal */}
      <div
        className={`relative ${item.aspectClass} w-full overflow-hidden bg-[#13181E] iron-mask-reveal ${
          revealed ? 'is-revealed' : ''
        }`}
      >
        {!imgError ? (
          <>
            {/* Primary Architectural Photograph */}
            <img
              src={item.image}
              alt={item.imageAlt}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                showDetail ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'
              }`}
            />

            {/* Secondary Craft Detail Crop (Hinge, Scrollwork, Finish) */}
            <img
              src={item.detailImage}
              alt={item.detailAlt}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              style={{
                objectPosition: item.detailCropPosition,
                transform:
                  item.detailImage === item.image
                    ? showDetail
                      ? 'scale(1.68)'
                      : 'scale(1.52)'
                    : showDetail
                      ? 'scale(1.04)'
                      : 'scale(1.0)',
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                showDetail ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#191F25] to-[#101419]">
            <span className="font-display text-2xl text-[#D6DCE2]">{item.title}</span>
            <span className="mt-1 text-xs text-[#A5B0BC]">{item.subtitle}</span>
          </div>
        )}

        {/* Measured contrast scrim at bottom of image */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#101419]/85 via-[#101419]/35 to-transparent pointer-events-none"
        />

        {/* Detail caption revealed on hover or keyboard/touch inspect */}
        <div
          className={`absolute left-4 right-16 bottom-3.5 z-10 transition-all duration-300 ${
            showDetail ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5 pointer-events-none'
          }`}
        >
          <p className="text-[0.8125rem] font-medium text-[#EDF2F7] leading-snug">
            {item.detailLabel}
          </p>
          <p className="text-[0.75rem] text-[#C4CED8] leading-snug mt-0.5">
            {item.detailSpec}
          </p>
        </div>

        {/* Accessible Keyboard & Touch Equivalent for Hover Detail Reveal */}
        <button
          type="button"
          onClick={() => setInspecting((prev) => !prev)}
          aria-pressed={inspecting}
          aria-label={
            inspecting
              ? `Show full architectural view of ${item.title}`
              : `Inspect close-up ironwork detail of ${item.title}`
          }
          className={`absolute bottom-3.5 right-3.5 z-20 inline-flex items-center justify-center w-10 h-10 border transition-colors duration-200 ${
            inspecting
              ? 'bg-[#D6DCE2] text-[#101419] border-[#D6DCE2]'
              : 'bg-[#101419]/88 text-[#D6DCE2] border-[#D6DCE2]/25 hover:border-[#D6DCE2]/60 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Editorial Copy & Verified Product Links */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <p className="text-[0.75rem] text-[#A5B0BC] tracking-[0.04em] tabular-nums">
              {item.index} <span aria-hidden="true" className="mx-1.5 text-[#D6DCE2]/30">/</span> {item.subtitle}
            </p>
          </div>

          <h3 className="font-display text-[1.75rem] sm:text-[2rem] leading-[1.12] font-medium text-[#EDF2F7] mb-2.5">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <span>{item.title}</span>
              <ArrowUpRight className="w-4 h-4 text-[#A5B0BC] group-hover:text-[#EDF2F7] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </a>
          </h3>

          <p className="text-[0.9375rem] leading-[1.6] text-[#A5B0BC] max-w-[54ch]">
            {item.description}
          </p>
        </div>

        {/* Verified Sub-Category Links (Unboxed typographic navigation, zero pills) */}
        <div className="pt-4 border-t border-[#D6DCE2]/10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[0.8125rem]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#A5B0BC]">
            {item.subLinks.map((sub, idx) => (
              <React.Fragment key={sub.href}>
                {idx > 0 && (
                  <span aria-hidden="true" className="text-[#D6DCE2]/25">
                    ·
                  </span>
                )}
                <a
                  href={sub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#EDF2F7] transition-colors whitespace-nowrap"
                >
                  {sub.label}
                </a>
              </React.Fragment>
            ))}
          </div>

          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D6DCE2] hover:text-white font-medium whitespace-nowrap shrink-0 transition-colors"
          >
            View Range
          </a>
        </div>
      </div>
    </article>
  );
};

export const CollectionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      aria-labelledby="collections-heading"
      className="relative py-20 sm:py-28 bg-[#101419]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Cropped Repeating Ironwork Frieze Divider */}
        <CollectionFriezeRule className="mb-12 sm:mb-14" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-[660px]">
            <p className="text-[0.8125rem] text-[#A5B0BC] tracking-[0.04em] mb-3">
              Architectural Collections · Custom Built in Woodbridge
            </p>
            <h2
              id="collections-heading"
              className="font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.08] font-medium text-[#EDF2F7]"
            >
              Gates, railings, and screens tailored to each elevation.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[0.875rem]">
            <p className="text-[#A5B0BC] max-w-[34ch] leading-relaxed">
              Hover any collection—or select the inspect control—to view forged joinery,
              hinges, and surface finish up close.
            </p>
            <a
              href={BUSINESS_INFO.galleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#D6DCE2] hover:text-white border-b border-[#D6DCE2]/35 hover:border-[#D6DCE2] pb-1 whitespace-nowrap shrink-0 self-start sm:self-end transition-colors"
            >
              <span>Full Project Gallery</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Asymmetric 12-Column Editorial Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
          {COLLECTIONS.map((item) => (
            <CollectionCard key={item.id} item={item} revealed={revealed} />
          ))}
        </div>
      </div>
    </section>
  );
};
