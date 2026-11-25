export interface CollectionSubLink {
  label: string;
  href: string;
}

export interface IronCollection {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  detailImage: string;
  detailAlt: string;
  detailLabel: string;
  detailSpec: string;
  detailCropPosition: string;
  spanClass: string;
  aspectClass: string;
  subLinks: CollectionSubLink[];
}

export interface CraftStage {
  id: string;
  index: string;
  title: string;
  summary: string;
  specification: string;
}

export const BUSINESS_INFO = {
  brandName: 'Ornate Iron Decor',
  legalName: 'Ornate Ironworks & Decor',
  websiteUrl: 'https://ornateirondecor.com/',
  contactPageUrl: 'https://ornateirondecor.com/contact-us/',
  galleryUrl: 'https://ornateirondecor.com/gallery/',
  projectsUrl: 'https://ornateirondecor.com/our-projects/',
  installationUrl: 'https://ornateirondecor.com/gate-fence-installation/',
  phoneDisplay: '+1 (365) 882-2213',
  phoneHref: 'tel:+13658822213',
  email: 'connect@ornateirondecor.com',
  emailHref: 'mailto:connect@ornateirondecor.com',
  addressLine: '136 Winges Rd Unit 6, Woodbridge, ON L4L 6C3',
  hoursWeekday: 'Mon – Fri: 9:00 AM – 6:00 PM',
  hoursWeekend: 'Sat – Sun: By Appointment Only',
  serviceAreas: [
    { name: 'Toronto', href: 'https://ornateirondecor.com/toronto/' },
    { name: 'Vaughan', href: 'https://ornateirondecor.com/vaughan/' },
    { name: 'Woodbridge & GTA', href: 'https://ornateirondecor.com/gate-fence-installation/' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/ornateirondecor/' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61579343084416' },
    { label: 'YouTube', href: 'https://www.youtube.com/@OrnateIronworksDecor' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@ornateirondecor' },
  ],
  verifiedProof: {
    clients: '150+ Clients Served',
    rating: '4.8 Customer Rating',
    origin: 'Woodbridge, Ontario Workshop',
  },
} as const;

export const HERO_MEDIA = {
  courtyardImage: './assets/collections/hero_estate_courtyard_1795582229330.jpg',
  courtyardAlt:
    'Twilight architectural driveway approach to a limestone and stucco Ontario residence framed by cut stone piers',
  fallbackGateImage: './assets/collections/collection_driveway_gate_1795582228915.jpg',
  fallbackGateAlt:
    'Custom black wrought-iron double driveway gate with arched scrollwork mounted between limestone pillars',
};

export const COLLECTIONS: IronCollection[] = [
  {
    id: 'driveway-gates',
    index: '01',
    title: 'Driveway Gates',
    subtitle: 'Swing & Sliding · Steel & Aluminum',
    description:
      'Custom double-leaf swing and sliding driveway gates fabricated from heavy-gauge steel and aluminum for Toronto, Vaughan, and GTA estates.',
    href: 'https://ornateirondecor.com/driveway-gates/',
    image: './assets/collections/collection_driveway_gate_1795582228915.jpg',
    imageAlt:
      'Custom black wrought-iron arched double driveway gate installed between cut limestone piers at an Ontario stone home',
    detailImage: './assets/collections/craft_ironwork_detail_1795582234648.jpg',
    detailAlt:
      'Macro close-up of hand-forged wrought-iron scrollwork, welded steel collar, and heavy-duty barrel hinge finished in matte dark graphite',
    detailLabel: 'Forged Hinge & Scroll Joinery',
    detailSpec: 'Heavy-duty barrel hinges · continuous TIG welds · satin graphite powder coat',
    detailCropPosition: 'center center',
    spanClass: 'lg:col-span-7',
    aspectClass: 'aspect-[16/10] lg:aspect-[16/10]',
    subLinks: [
      { label: 'Swing & Sliding', href: 'https://ornateirondecor.com/driveway-gates-1/swing-and-sliding-gates/' },
      { label: 'Metal Gates', href: 'https://ornateirondecor.com/driveway-gates-1/metal-gates/' },
      { label: 'Aluminum Gates', href: 'https://ornateirondecor.com/driveway-gates-1/aluminum-driveway-gates/' },
    ],
  },
  {
    id: 'pedestrian-gates',
    index: '02',
    title: 'Pedestrian Gates',
    subtitle: 'Garden, Side Entry & Pool Perimeters',
    description:
      'Precision-welded metal, laser-cut, and composite entry gates proportioned to stone walls, courtyards, and residential walkways.',
    href: 'https://ornateirondecor.com/pedestrian-gates/',
    image: './assets/collections/collection_pedestrian_gate_1795582229939.jpg',
    imageAlt:
      'Matte-black steel pedestrian gate with geometric diagonal bar geometry set into a dark limestone garden wall',
    detailImage: './assets/collections/collection_pedestrian_gate_1795582229939.jpg',
    detailAlt:
      'Close-up crop of diagonal welded steel bars, mortise lockbox, and matte black satin finish on a custom pedestrian gate',
    detailLabel: 'Lockbox & Mitred Bar Geometry',
    detailSpec: 'Flush welded lock plate · recessed latch hardware · precision angled steel bars',
    detailCropPosition: '54% 48%',
    spanClass: 'lg:col-span-5',
    aspectClass: 'aspect-[4/3] lg:aspect-[10/9]',
    subLinks: [
      { label: 'Metal Pedestrian', href: 'https://ornateirondecor.com/pedestrian-gates/metal-pedestrian-gates/' },
      { label: 'Laser-Cut Gates', href: 'https://ornateirondecor.com/pedestrian-gates/laser-cut-gates/' },
      { label: 'Composite Gates', href: 'https://ornateirondecor.com/pedestrian-gates/composite-gates/' },
    ],
  },
  {
    id: 'metal-railings',
    index: '03',
    title: 'Metal & Laser-Cut Railings',
    subtitle: 'Staircases, Porches, Balconies & Decks',
    description:
      'Interior and exterior railings measured to your architecture, pairing rigid structural frames with fiber-laser botanical or linear infill panels.',
    href: 'https://ornateirondecor.com/metal-railing/',
    image: './assets/collections/collection_stair_railing_1795582230508.jpg',
    imageAlt:
      'Custom black steel interior stair railing featuring fiber-laser cut botanical scrollwork panels and brushed dark handrail',
    detailImage: './assets/collections/collection_stair_railing_1795582230508.jpg',
    detailAlt:
      'Close-up view of fiber-laser cut steel botanical pattern and continuous formed steel top rail',
    detailLabel: 'Fiber-Laser Infill & Formed Rail',
    detailSpec: 'CNC fiber-laser plate · continuous hand-finished steel rail · concealed base flanges',
    detailCropPosition: '62% 56%',
    spanClass: 'lg:col-span-5',
    aspectClass: 'aspect-[4/3] lg:aspect-[10/9]',
    subLinks: [
      { label: 'Metal Railings', href: 'https://ornateirondecor.com/metal-railing/' },
      { label: 'Laser-Cut Railings', href: 'https://ornateirondecor.com/laser-cut-railing/' },
      { label: 'Aluminum Stair', href: 'https://ornateirondecor.com/aluminum-stair-railing/' },
    ],
  },
  {
    id: 'fences-screens',
    index: '04',
    title: 'Fences & Privacy Screens',
    subtitle: 'Steel Fencing & Architectural Panels',
    description:
      'Iron, steel, and aluminum perimeter fencing alongside custom fiber-laser privacy screens cut for terraces, patios, and lot lines.',
    href: 'https://ornateirondecor.com/fence/',
    image: './assets/collections/collection_privacy_fence_1795582231852.jpg',
    imageAlt:
      'Modern black steel perimeter fence and illuminated laser-cut privacy screen panels along a contemporary twilight terrace',
    detailImage: './assets/collections/collection_privacy_fence_1795582231852.jpg',
    detailAlt:
      'Close-up crop of architectural laser-cut steel privacy screen showing clean geometric cutouts and uplighted metallic edges',
    detailLabel: 'Architectural Screen Aperture',
    detailSpec: 'Weather-sealed steel posts · custom motif perforations · exterior powder finish',
    detailCropPosition: '80% 42%',
    spanClass: 'lg:col-span-7',
    aspectClass: 'aspect-[16/10] lg:aspect-[16/10]',
    subLinks: [
      { label: 'Metal Fence', href: 'https://ornateirondecor.com/metal-fence/' },
      { label: 'Privacy Screens', href: 'https://ornateirondecor.com/privacy-screen/' },
      { label: 'Composite Fence', href: 'https://ornateirondecor.com/composite-fence/' },
    ],
  },
];

export const CRAFT_STAGES: CraftStage[] = [
  {
    id: 'measurement',
    index: '01',
    title: 'On-Site Measurement & Custom Drafting',
    summary:
      'Every commission starts at your property in Woodbridge, Toronto, Vaughan, or the GTA—recording pier clearances, driveway slope, and architectural sightlines with zero stock templates.',
    specification: 'Site survey · elevation drawings · opening clearance check',
  },
  {
    id: 'fabrication',
    index: '02',
    title: 'Fiber-Laser Cutting & Hand Forging',
    summary:
      'Our Woodbridge workshop combines CNC fiber-laser accuracy for modern geometric and botanical screens with traditional hand-forged scrollwork, collars, and solid steel pickets.',
    specification: 'In-house fiber laser · hand-formed scrolls · seamless welded joints',
  },
  {
    id: 'hardware',
    index: '03',
    title: 'Heavy Hardware & Exterior Finish',
    summary:
      'Structural hinges, lockboxes, and weather-resistant architectural coatings are engineered to hold alignment through Ontario freeze-thaw cycles without sagging.',
    specification: 'Barrel hinges · automation-ready frames · exterior matte & satin finishes',
  },
  {
    id: 'installation',
    index: '04',
    title: 'Direct Installation by Our Crew',
    summary:
      'We install the gates, railings, and fences we fabricate—setting structural posts, balancing double-leaf swing geometry, and testing every latch before handover.',
    specification: 'Dedicated GTA installation crew · plumb & level verification',
  },
];

export const NAV_LINKS = [
  { label: 'Driveway Gates', href: '#collections' },
  { label: 'Railings', href: '#collections' },
  { label: 'Fences', href: '#collections' },
  { label: 'Craftsmanship', href: '#craftsmanship' },
  { label: 'Showroom', href: '#enquiry' },
];
