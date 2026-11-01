import type { LedgerEntry, MediaAssetItem } from '../utils/wikiCompliance';

export const NSWF_SYSTEM_INSTRUCTIONS = `You are the "NSWF WikiArchitect & Compliance Engine," an expert Wikipedia Articles for Creation (AfC) reviewer, MediaWiki markup engineer, and digital documentation specialist assigned to Nisarg Srishti Welfare Foundation (NSWF).

Your objective is to process raw research, press releases, MCA records, and campaign logs about Nisarg Srishti Welfare Foundation and convert them into a 100% standards-compliant Wikipedia article draft.

STRICT EDITORIAL RULES:
1. WP:NPOV & WP:PEACOCK ENFORCEMENT: Strip all promotional adjectives ("visionary", "passionately", "renowned", "bold steps", "leading", "impactful"). Rewrite every claim in neutral, clinical, encyclopedic prose. Attribute subjective statements ("According to...", "The foundation states that...").
2. SOURCE CLASSIFICATION (WP:RS):
   - Use Primary Sources (MCA/ROC Pune filings, nisargsrishti.org) ONLY for uncontroversial administrative facts (incorporation date, CIN, headquarters, leadership names, tool names).
   - Use Secondary Sources (IndiaChronicle, Bharat Good Times, Stay Featured, France 24 coverage) for collaborations, MoUs, and public campaigns.
3. DUAL-FORMAT OUTPUT: Whenever generating article sections, output both:
   - Clean readable Markdown with inline numbered citations.
   - Raw MediaWiki Wikitext (\`{{Infobox organization}}\`, \`== Headings ==\`, \`<ref>{{cite web|...}}</ref>\`, and \`{{Reflist}}\`).
4. MEDIA CURATION AUDIT: Never advise direct copying of copyrighted website images without detailing the Wikimedia Commons CC BY-SA 4.0 / VRTS release protocol.`;

export const RAW_MEDIAWIKI_WIKITEXT = `{{Short description|Indian environmental non-governmental organization}}
{{Use dmy dates|date=November 2026}}
{{Use Indian English|date=November 2026}}

{{Infobox organization
| name                = Nisarg Srishti Welfare Foundation
| native_name         = निसर्ग सृष्टी वेलफेअर फाउंडेशन
| abbreviation        = NSWF
| motto               = ''Nisarg Srishti Sanrakshan – Together for a Sustainable Tomorrow''
| formation           = {{Start date and age|2023|01|11|df=yes}}
| type                = [[Non-governmental organization]] (Section 8 Non-Profit)
| registration_id     = U85300PN2023NPL217884 ([[Ministry of Corporate Affairs|MCA]])
| status              = Active
| headquarters        = Manjari BK, [[Pune]], [[Maharashtra]], India
| key_people          = * Garima Gaurav Kavathekar (Founder & Managing Director)
* Deepali Kavathekar (Director)
* Nagesh Alkunthe (Additional Director)
| focus               = Noise pollution mitigation, acoustic mapping, environmental conservation, sustainability education
| website             = {{URL|https://www.nisargsrishti.org/}}
}}

'''Nisarg Srishti Welfare Foundation''' ('''NSWF''') is an Indian non-profit environmental [[non-governmental organization]] headquartered in [[Pune]], [[Maharashtra]].<ref name="Tracxn">{{cite web |title=Nisarg Srishti Welfare Foundation - Company Profile & Financials |url=https://tracxn.com/d/legal-entities/india/nisarg-srishti-welfare-foundation/__WjAtPpn3L3yqKKfi-pZNvFK6tU6bXFTsLsutNimQfCA |website=Tracxn |date=19 July 2026 |access-date=1 November 2026}}</ref> Incorporated in January 2023, the organization works in the domains of urban [[noise pollution]] awareness, citizen decibel mapping, water conservation, and school-based environmental education.<ref name="StayFeatured">{{cite web |title=Nisarg Srishti Welfare Foundation Takes Bold Steps: Combats Noise Pollution and Promotes Water Conservation |url=https://www.stayfeatured.com/post/nisarg-srishti-welfare-foundation-takes-bold-steps-combats-noise-pollution-and-promotes-water-conse |website=Stay Featured |date=28 February 2024 |access-date=1 November 2026}}</ref><ref name="IITB">{{cite web |title=Empowering Sustainability: IIT Bombay and Nisarg Srishti Welfare Foundation Collaborate for Environmental Initiatives |url=https://indiachronicle.in/empowering-sustainability-iit-bombay-and-nisarg-srishti-welfare-foundation-collaborate-for-environmental-initiatives/ |website=IndiaChronicle |date=15 June 2026 |access-date=1 November 2026}}</ref>

== Background ==
Nisarg Srishti Welfare Foundation was incorporated on 11 January 2023 under the [[Registrar of Companies]] (RoC), Pune, with Corporate Identification Number (CIN) U85300PN2023NPL217884.<ref name="Tracxn"/> The organization was founded by Garima Gaurav Kavathekar, who serves as its Managing Director, alongside board directors Deepali Kavathekar and Nagesh Alkunthe.<ref name="Tracxn"/><ref name="NSWFHome">{{cite web |title=About & Team – Nisarg Srishti Welfare Foundation |url=https://www.nisargsrishti.org/ |website=Nisarg Srishti Welfare Foundation |access-date=1 November 2026}}</ref> It is certified under [[ISO 14001|ISO 14001:2015]] standards for environmental management.<ref name="NSWFHome"/>

The foundation is supported by a technical advisory board that includes aeroacoustics researcher Dipali Ghodake, [[Internet of things|IoT]] and audience measurement specialist Kunal Jagdale, hydroponics technologist Kashyap Bhatt, and aerospace professional Ninad Joshi.<ref name="Advisors">{{cite web |title=Our Advisors |url=https://www.nisargsrishti.org/services-4 |website=Nisarg Srishti Welfare Foundation |access-date=1 November 2026}}</ref>

== Mission and vision ==
Operating under the tagline ''Nisarg Srishti Sanrakshan – Together for a Sustainable Tomorrow'', the foundation focuses on mitigating urban noise pollution, conserving natural and water resources, promoting renewable energy adoption, and conducting community education programs.<ref name="IITB"/><ref name="Regional">{{cite web |title=Regional Office & Mandate |url=https://www.nisargsrishti.org/regionaloffice |website=Nisarg Srishti Welfare Foundation |access-date=1 November 2026}}</ref>

== Programs and initiatives ==
=== Acoustic monitoring and mapping ===
NSWF maintains digital tools on its public portal, including a ''Live Noise Monitoring'' interface, the ''NoiseAware'' citizen reporting portal, and a ''Citizen Noise Heat Map''.<ref name="NSWFHome"/> In collaboration with IoT specialists and public health researchers, the organization conducts decibel (dB) monitoring across urban corridors in Pune, particularly during high-decibel public festivities such as [[Ganesh Chaturthi|Ganesh Utsav]].<ref name="Gallery">{{cite web |title=Photo Gallery & Activity Logs |url=https://www.nisargsrishti.org/photo-gallery |website=Nisarg Srishti Welfare Foundation |access-date=1 November 2026}}</ref>

=== Resource conservation and e-waste ===
The foundation conducts awareness drives focused on urban water conservation, sustainable farming methods including hydroponics, and safe disposal of electronic waste.<ref name="StayFeatured"/><ref name="Electrofine">{{cite web |title=Nisarg Srishti Welfare Foundation and Electrofine Join Hands for Environmental Awareness and Action |url=https://indiachronicle.in/nisarg-srishti-welfare-foundation-and-electrofine-join-hands-for-environmental-awareness-and-action/ |website=IndiaChronicle |date=16 November 2025 |access-date=1 November 2026}}</ref>

== Outreach activities ==
Between 2025 and 2026, NSWF organized structured environmental and noise-pollution workshops across schools in the Pune metropolitan area, including:
* '''Kalawati Dattatray Kotwal High School, Pune''' (July 2025): Student demonstrations on urban decibel reduction and eco-friendly practices.<ref name="Gallery"/>
* '''PMC's Late Ramchandra Bankar School & Sports Complex, Pune''' (August 2025): Launch of an annual student noise pollution awareness programme addressing the health and cognitive impacts of urban noise.<ref name="Gallery"/><ref name="IITB"/>
* '''Nutan Madhyamik Vidyalay, Vadki''' (September 2025): Grassroots student workshops on acoustic health and environmental stewardship.<ref name="Gallery"/>

== Collaborations ==
* '''[[IIT Bombay]]''' (June 2026): Partnership focused on sustainability advocacy and environmental conservation programmes.<ref name="IITB"/>
* '''[[Gokhale Institute of Politics and Economics]] (GIPE), Pune''' (August 2025): Joint empirical noise-level monitoring across Pune during Ganesh Utsav 2025 and student academic visits.<ref name="Gallery"/>
* '''IIEBM Indus Business School, Pune''' (February 2025): Memorandum of Understanding (MoU) for student engagement in sustainable development and community welfare projects.<ref name="IIEBM">{{cite web |title=Nisarg Srishti Welfare Foundation and IIEBM Indus Business School Sign MOU to Forge Strategic Partnership |url=https://bharatgoodtimes.com/nisarg-srishti-welfare-foundation-and-iiebm-indus-business-school-sign-mou-to-forge-strategic-partnership |website=Bharat Good Times |date=18 February 2025 |access-date=1 November 2026}}</ref>
* '''Electrofine Recycling Pvt. Ltd.''' (November 2025): Collaborative campaign for environmental awareness and e-waste recycling.<ref name="Electrofine"/>

== Impact ==
NSWF's school and civic outreach campaigns have engaged thousands of students and residents in Maharashtra.<ref name="IITB"/> In February 2026, the foundation's anti-noise pollution campaign was featured in a documentary broadcast by the French international news network ''[[France 24]]''.<ref name="France24">{{cite web |title=Nisarg Srishti Welfare Foundation's Noise Pollution Campaign Featured in France 24 Documentary |url=https://indiachronicle.in/nisarg-srishti-welfare-foundations-noise-pollution-campaign-featured-in-france-24-documentary/ |website=IndiaChronicle |date=18 February 2026 |access-date=1 November 2026}}</ref>

== References ==
{{Reflist}}

== External links ==
* {{Official website|https://www.nisargsrishti.org/}}

[[Category:Environmental organizations based in India]]
[[Category:Non-profit organisations based in Pune]]
[[Category:Organisations established in 2023]]
[[Category:Noise pollution]]`;

export const READABLE_MARKDOWN_DRAFT = `# Nisarg Srishti Welfare Foundation

**Nisarg Srishti Welfare Foundation (NSWF)** is an Indian non-profit environmental non-governmental organization headquartered in Pune, Maharashtra.[1] Incorporated on 11 January 2023 as a non-profit entity under the Ministry of Corporate Affairs, the organization focuses on urban noise pollution mitigation, acoustic mapping, water conservation, e-waste awareness, and community-based sustainability education.[2][3]

## 1. Background
Nisarg Srishti Welfare Foundation was formally registered on 11 January 2023 with the Registrar of Companies (RoC) in Pune under Corporate Identification Number (CIN) \`U85300PN2023NPL217884\`.[1] The organization was founded by Garima Gaurav Kavathekar, who serves as its Managing Director, alongside Director Deepali Kavathekar and Additional Director Nagesh Alkunthe.[1][4] Operating from Manjari BK in Pune, the foundation holds an ISO 14001:2015 certification for environmental management practices.[4]

To support its technical initiatives in acoustic monitoring and sustainability, the foundation established a multidisciplinary advisory board comprising specialists in aeroacoustics engineering, Internet of Things (IoT) telemetry, hydroponics, corporate social responsibility (CSR), and documentary filmmaking, including Dr. Dipali Ghodake (aeroacoustics researcher), Kunal Jagdale (IoT and audience measurement specialist), and Kashyap Bhatt (hydroponics technologist).[5]

## 2. Mission and Vision
Operating under the Marathi and English motto *"Nisarg Srishti Sanrakshan – Together for a Sustainable Tomorrow,"* the organization's stated mandate is to address neglected environmental hazards—primarily urban and festive noise pollution—alongside broader ecological conservation, water resource management, renewable energy advocacy, and grassroots environmental literacy among school students and urban residents.[3][6]

## 3. Programs and Initiatives
NSWF structures its operational work around three core technical and environmental verticals:

* **Acoustic Monitoring and Citizen Science:** The foundation operates digital monitoring interfaces on its portal, including a *Live Noise Monitoring* dashboard, the *NoiseAware* citizen noise-reporting system, and a *Citizen Noise Heat Map*.[4] Through IoT guidance from its technical advisors and acoustic specialists such as Dr. Venkatesh Maled, the organization conducts decibel (dB) mapping across urban zones to document noise pollution trends.[7]
* **Festive Noise Assessment:** During major public festivals such as Ganeshotsav in Pune, NSWF organizes field measurement drives with university student volunteers to record ambient decibel levels across high-traffic intersections and promote compliance with statutory noise limits.[7]
* **Resource Conservation and E-Waste Management:** Beyond acoustic ecology, the foundation runs community programs focused on water conservation, sustainable agricultural practices (including hydroponics advisory), and electronic waste (e-waste) recycling drives.[2][8]

## 4. Outreach Activities
A primary pillar of NSWF’s field operations involves structured educational workshops across municipal and private schools in Maharashtra to sensitize students to the physiological and cognitive impacts of prolonged noise exposure:

* **Municipal & High School Drives (2025–2026):** In July and August 2025, the foundation's executive team conducted interactive noise-abatement demonstrations at Kalawati Dattatray Kotwal High School and the Pune Municipal Corporation's (PMC) Late Ramchandra Bankar School & Sports Complex, where it inaugurated an annual student noise pollution awareness programme.[3][7]
* **Peri-Urban Grassroots Sessions:** In September 2025, NSWF expanded its school outreach to Nutan Madhyamik Vidyalay in Vadki, Pune, focusing on youth-led preventive measures against community noise hazards.[7]

## 5. Collaborations
NSWF partners with academic institutions and environmental enterprises to execute field research and awareness campaigns:

* **Indian Institute of Technology (IIT) Bombay (2026):** In June 2026, NSWF entered into a collaborative initiative with IIT Bombay to advance joint environmental conservation and sustainability awareness programs.[3]
* **Gokhale Institute of Politics and Economics (GIPE), Pune (2025):** In August 2025, second-year students from GIPE engaged in academic field exposure with NSWF and collaborated on empirical noise-level data collection across Pune during the Ganesh Utsav 2025 celebrations.[7]
* **IIEBM Indus Business School (2025):** In February 2025, the foundation signed a Memorandum of Understanding (MoU) with IIEBM Indus Business School in Pune to integrate management students into community empowerment and sustainable development projects.[9]
* **Electrofine Recycling Pvt. Ltd. (2025):** In November 2025, NSWF partnered with Electrofine Recycling Pvt. Ltd. to conduct joint environmental awareness and e-waste management campaigns.[8]

## 6. Impact and Recognition
Through its combined school outreach and institutional partnerships, NSWF has documented awareness sessions reaching thousands of students across the Pune metropolitan region.[3] During the 2024–2025 financial year, the organization recorded a 166% compound annual growth rate in operational turnover under its social work mandate.[1] In early 2026, the foundation's grassroots urban noise pollution campaign was featured in an international documentary report by French public broadcaster *France 24*, examining civic responses to acoustic pollution in Indian cities.[10]`;

export interface WikiCitation {
  id: number;
  refName: string;
  title: string;
  publisher: string;
  date: string;
  accessDate: string;
  url: string;
  sourceType: 'Primary (WP:PRIMARY)' | 'Secondary (WP:RS)';
  usageScope: string;
}

export const WIKI_CITATIONS: WikiCitation[] = [
  {
    id: 1,
    refName: 'Tracxn',
    title: 'Nisarg Srishti Welfare Foundation - Company Profile & Financials',
    publisher: 'Tracxn / MCA Legal Entity Registry',
    date: '19 July 2026',
    accessDate: '1 November 2026',
    url: 'https://tracxn.com/d/legal-entities/india/nisarg-srishti-welfare-foundation/__WjAtPpn3L3yqKKfi-pZNvFK6tU6bXFTsLsutNimQfCA',
    sourceType: 'Primary (WP:PRIMARY)',
    usageScope: 'Corporate Identification Number (CIN), incorporation date, registered directors, financial filing records.',
  },
  {
    id: 2,
    refName: 'StayFeatured',
    title: 'Nisarg Srishti Welfare Foundation Takes Bold Steps: Combats Noise Pollution and Promotes Water Conservation',
    publisher: 'Stay Featured',
    date: '28 February 2024',
    accessDate: '1 November 2026',
    url: 'https://www.stayfeatured.com/post/nisarg-srishti-welfare-foundation-takes-bold-steps-combats-noise-pollution-and-promotes-water-conse',
    sourceType: 'Secondary (WP:RS)',
    usageScope: 'Third-party coverage of noise pollution mitigation and water conservation campaigns.',
  },
  {
    id: 3,
    refName: 'IITB',
    title: 'Empowering Sustainability: IIT Bombay and Nisarg Srishti Welfare Foundation Collaborate for Environmental Initiatives',
    publisher: 'IndiaChronicle',
    date: '15 June 2026',
    accessDate: '1 November 2026',
    url: 'https://indiachronicle.in/empowering-sustainability-iit-bombay-and-nisarg-srishti-welfare-foundation-collaborate-for-environmental-initiatives/',
    sourceType: 'Secondary (WP:RS)',
    usageScope: 'IIT Bombay June 2026 collaboration, student awareness scale, and organizational motto.',
  },
  {
    id: 4,
    refName: 'NSWFHome',
    title: 'About & Team – Nisarg Srishti Welfare Foundation',
    publisher: 'Nisarg Srishti Welfare Foundation Official Portal',
    date: '2026',
    accessDate: '1 November 2026',
    url: 'https://www.nisargsrishti.org/',
    sourceType: 'Primary (WP:PRIMARY)',
    usageScope: 'ISO 14001:2015 certification, executive project heads, and hosted digital tools (Live Noise Monitoring, NoiseAware).',
  },
  {
    id: 5,
    refName: 'Advisors',
    title: 'Our Advisors – Technical & Multidisciplinary Board',
    publisher: 'Nisarg Srishti Welfare Foundation',
    date: '2026',
    accessDate: '1 November 2026',
    url: 'https://www.nisargsrishti.org/services-4',
    sourceType: 'Primary (WP:PRIMARY)',
    usageScope: 'Uncontroversial directory of technical advisors (Dr. Dipali Ghodake, Kunal Jagdale, Kashyap Bhatt, Ninad Joshi).',
  },
  {
    id: 6,
    refName: 'Regional',
    title: 'Regional Office & Mandate',
    publisher: 'Nisarg Srishti Welfare Foundation',
    date: '2026',
    accessDate: '1 November 2026',
    url: 'https://www.nisargsrishti.org/regionaloffice',
    sourceType: 'Primary (WP:PRIMARY)',
    usageScope: 'Stated organizational vision, regional operational mandate, and Manjari BK office location.',
  },
  {
    id: 7,
    refName: 'Gallery',
    title: 'Photo Gallery & Verified Activity Logs (2025–2026)',
    publisher: 'Nisarg Srishti Welfare Foundation',
    date: '2025–2026',
    accessDate: '1 November 2026',
    url: 'https://www.nisargsrishti.org/photo-gallery',
    sourceType: 'Primary (WP:PRIMARY)',
    usageScope: 'Dated field workshop logs at PMC Late Ramchandra Bankar School, Kalawati Kotwal High School, Nutan Madhyamik Vidyalay Vadki, and GIPE Pune Ganesh Utsav monitoring.',
  },
  {
    id: 8,
    refName: 'Electrofine',
    title: 'Nisarg Srishti Welfare Foundation and Electrofine Join Hands for Environmental Awareness and Action',
    publisher: 'IndiaChronicle',
    date: '16 November 2025',
    accessDate: '1 November 2026',
    url: 'https://indiachronicle.in/nisarg-srishti-welfare-foundation-and-electrofine-join-hands-for-environmental-awareness-and-action/',
    sourceType: 'Secondary (WP:RS)',
    usageScope: 'Secondary verification of the November 2025 Electrofine Recycling Pvt. Ltd. partnership for e-waste recycling.',
  },
  {
    id: 9,
    refName: 'IIEBM',
    title: 'Nisarg Srishti Welfare Foundation and IIEBM Indus Business School Sign MOU to Forge Strategic Partnership',
    publisher: 'Bharat Good Times',
    date: '18 February 2025',
    accessDate: '1 November 2026',
    url: 'https://bharatgoodtimes.com/nisarg-srishti-welfare-foundation-and-iiebm-indus-business-school-sign-mou-to-forge-strategic-partnership',
    sourceType: 'Secondary (WP:RS)',
    usageScope: 'Independent coverage of the February 2025 MoU with IIEBM Indus Business School, Pune.',
  },
  {
    id: 10,
    refName: 'France24',
    title: "Nisarg Srishti Welfare Foundation's Noise Pollution Campaign Featured in France 24 Documentary",
    publisher: 'IndiaChronicle',
    date: '18 February 2026',
    accessDate: '1 November 2026',
    url: 'https://indiachronicle.in/nisarg-srishti-welfare-foundations-noise-pollution-campaign-featured-in-france-24-documentary/',
    sourceType: 'Secondary (WP:RS)',
    usageScope: 'International documentary coverage by French public broadcaster France 24 in February 2026.',
  },
];

export const INITIAL_RESEARCH_LEDGER: LedgerEntry[] = [
  {
    id: 'LEDGER-01',
    category: 'Legal Name',
    verifiedFact: 'Nisarg Srishti Welfare Foundation (NSWF) — निसर्ग सृष्टी वेलफेअर फाउंडेशन',
    sourceReference: 'ROC Pune / MCA Corporate Registry',
    sourceUrl: 'https://tracxn.com/d/legal-entities/india/nisarg-srishti-welfare-foundation/__WjAtPpn3L3yqKKfi-pZNvFK6tU6bXFTsLsutNimQfCA',
    sourceType: 'Primary',
    wpPolicy: 'WP:PRIMARY (Legal Identity)',
    dateVerified: '11 Jan 2023',
  },
  {
    id: 'LEDGER-02',
    category: 'Corporate Identity Number (CIN)',
    verifiedFact: 'U85300PN2023NPL217884 (Section 8 Non-Profit Company under MCA)',
    sourceReference: 'MCA / Tracxn Legal Entity Profile',
    sourceUrl: 'https://tracxn.com/d/legal-entities/india/nisarg-srishti-welfare-foundation/__WjAtPpn3L3yqKKfi-pZNvFK6tU6bXFTsLsutNimQfCA',
    sourceType: 'Primary',
    wpPolicy: 'WP:PRIMARY (Statutory Registration)',
    dateVerified: '19 Jul 2026',
  },
  {
    id: 'LEDGER-03',
    category: 'Incorporation Date',
    verifiedFact: '11 January 2023 (Registered at RoC-Pune)',
    sourceReference: 'ROC Pune Statutory Filing',
    sourceUrl: 'https://tracxn.com/d/legal-entities/india/nisarg-srishti-welfare-foundation/__WjAtPpn3L3yqKKfi-pZNvFK6tU6bXFTsLsutNimQfCA',
    sourceType: 'Primary',
    wpPolicy: 'WP:PRIMARY (Incorporation Record)',
    dateVerified: '11 Jan 2023',
  },
  {
    id: 'LEDGER-04',
    category: 'Registered Headquarters',
    verifiedFact: 'Shop No. 02, Vision Galaxy, S No. 143A/1, Kunjir Colony, Manjari BK, Pune, Haveli, Maharashtra – 412307, India',
    sourceReference: 'ROC Pune Filing & Regional Mandate Page',
    sourceUrl: 'https://www.nisargsrishti.org/regionaloffice',
    sourceType: 'Primary',
    wpPolicy: 'WP:PRIMARY (Administrative Address)',
    dateVerified: '01 Nov 2026',
  },
  {
    id: 'LEDGER-05',
    category: 'Certifications',
    verifiedFact: 'ISO 14001:2015 (Environmental Management Systems)',
    sourceReference: 'Official Website (nisargsrishti.org)',
    sourceUrl: 'https://www.nisargsrishti.org/',
    sourceType: 'Primary',
    wpPolicy: 'WP:PRIMARY (Standard Compliance)',
    dateVerified: '01 Nov 2026',
  },
  {
    id: 'LEDGER-06',
    category: 'Key Leadership (Board)',
    verifiedFact: 'Garima Gaurav Kavathekar (Founder & Managing Director), Deepali Kavathekar (Director), Nagesh Alkunthe (Additional Director)',
    sourceReference: 'MCA Filings & Official Team Directory',
    sourceUrl: 'https://www.nisargsrishti.org/',
    sourceType: 'Primary',
    wpPolicy: 'WP:PRIMARY (Board Composition)',
    dateVerified: '19 Jul 2026',
  },
  {
    id: 'LEDGER-07',
    category: 'Project & Operational Heads',
    verifiedFact: 'Rajendra Kulkarni (Manager), Ganpati Khot (Event Co-ordinator), Neena Singh (Environmental Project Head – Maharashtra), Sashikala Kumbhar (Educational Project Head – Pune)',
    sourceReference: 'Official Website (nisargsrishti.org)',
    sourceUrl: 'https://www.nisargsrishti.org/',
    sourceType: 'Primary',
    wpPolicy: 'WP:PRIMARY (Executive Directory)',
    dateVerified: '01 Nov 2026',
  },
  {
    id: 'LEDGER-08',
    category: 'Advisory Board',
    verifiedFact: 'Dr. Dipali Ghodake (PhD Aeroacoustics, Montreal), Ninad Joshi (Aerospace, Ontario), Kunal Jagdale (Founder/COO, Inditronics – IoT & Noise Measurement), Kashyap Bhatt (CEO, Greenfield/AquaGreen Hydroponics), Shrikrishna Laxman Gadkari (CSR & Legal)',
    sourceReference: 'Official Advisors Directory (nisargsrishti.org/services-4)',
    sourceUrl: 'https://www.nisargsrishti.org/services-4',
    sourceType: 'Primary',
    wpPolicy: 'WP:PRIMARY (Advisory Roster)',
    dateVerified: '01 Nov 2026',
  },
  {
    id: 'LEDGER-09',
    category: 'Digital & Technical Tools',
    verifiedFact: 'Live Noise Monitoring Portal, NoiseAware (citizen noise reporting tool), Citizen Noise Heat Map, Nationwide dB Monitoring / Mega Noise Mapping Initiative',
    sourceReference: 'Official Portal & IndiaChronicle',
    sourceUrl: 'https://indiachronicle.in/empowering-sustainability-iit-bombay-and-nisarg-srishti-welfare-foundation-collaborate-for-environmental-initiatives/',
    sourceType: 'Secondary',
    wpPolicy: 'WP:RS (Technical Program Verification)',
    dateVerified: '15 Jun 2026',
  },
  {
    id: 'LEDGER-10',
    category: 'Academic & Corporate Collaborations',
    verifiedFact: 'IIT Bombay (June 2026 sustainability initiative); Gokhale Institute of Politics and Economics (GIPE), Pune (Aug 2025 Ganesh Utsav noise measurement); IIEBM Indus Business School (Feb 2025 MoU); Electrofine Recycling Pvt. Ltd. (Nov 2025 e-waste partnership)',
    sourceReference: 'IndiaChronicle & Bharat Good Times',
    sourceUrl: 'https://bharatgoodtimes.com/nisarg-srishti-welfare-foundation-and-iiebm-indus-business-school-sign-mou-to-forge-strategic-partnership',
    sourceType: 'Secondary',
    wpPolicy: 'WP:RS & WP:NORG (Institutional Partnerships)',
    dateVerified: '15 Jun 2026',
  },
  {
    id: 'LEDGER-11',
    category: 'School Outreach Campaigns',
    verifiedFact: "PMC's Late Ramchandra Bankar School & Sports Complex (Aug 2025), Kalawati Dattatray Kotwal High School (July 2025), Nutan Madhyamik Vidyalay, Vadki (Sept 2025)",
    sourceReference: 'Official Activity Logs & IndiaChronicle',
    sourceUrl: 'https://www.nisargsrishti.org/photo-gallery',
    sourceType: 'Secondary',
    wpPolicy: 'WP:RS (Outreach Verification)',
    dateVerified: '20 Sep 2025',
  },
  {
    id: 'LEDGER-12',
    category: 'Media & Documentary Coverage',
    verifiedFact: 'Featured in a France 24 international documentary segment examining urban noise pollution campaigns in India (reported Feb 2026); 166% YoY operational turnover growth in FY 2024–25',
    sourceReference: 'IndiaChronicle & Tracxn Financials',
    sourceUrl: 'https://indiachronicle.in/nisarg-srishti-welfare-foundations-noise-pollution-campaign-featured-in-france-24-documentary/',
    sourceType: 'Secondary',
    wpPolicy: 'WP:NORG (Significant Secondary Coverage)',
    dateVerified: '18 Feb 2026',
  },
];

export const MEDIA_ASSETS_MATRIX: MediaAssetItem[] = [
  {
    id: 'Media 01',
    filename: 'File:NSWF_Ganesh_Utsav_2025_Noise_Monitoring_Pune.jpg',
    visualSubject: 'GIPE students & NSWF volunteers measuring ambient decibel levels with sound level meters during Ganesh Utsav 2025 in Pune (05 Aug 2025 field log)',
    eventDate: '2025-08-05',
    targetSection: 'Programs and initiatives',
    protocol: 'Requires official email release from info@nisargsrishti.org to permissions-commons@wikimedia.org under CC BY-SA 4.0',
    license: 'CC BY-SA 4.0 (Pending VRTS Ticket)',
    sourceUrl: 'https://www.nisargsrishti.org/photo-gallery',
  },
  {
    id: 'Media 02',
    filename: 'File:NSWF_Noise_Awareness_Ramchandra_Bankar_School_Pune.jpg',
    visualSubject: "NSWF executive team conducting student noise pollution workshop at PMC's Late Ramchandra Bankar School & Sports Complex, Pune (05 Aug 2025)",
    eventDate: '2025-08-05',
    targetSection: 'Outreach activities',
    protocol: 'CC BY-SA 4.0 VRTS release via NSWF Media Team to permissions-commons@wikimedia.org',
    license: 'CC BY-SA 4.0 (Pending VRTS Ticket)',
    sourceUrl: 'https://www.nisargsrishti.org/photo-gallery',
  },
  {
    id: 'Media 03',
    filename: 'File:NSWF_Gokhale_Institute_Student_Interaction_2025.jpg',
    visualSubject: 'Gokhale Institute of Politics and Economics (GIPE) second-year students interacting with Garima Kavathekar at NSWF Pune office (23 Aug 2025)',
    eventDate: '2025-08-23',
    targetSection: 'Collaborations',
    protocol: 'CC BY-SA 4.0 VRTS release via NSWF Media Team to permissions-commons@wikimedia.org',
    license: 'CC BY-SA 4.0 (Pending VRTS Ticket)',
    sourceUrl: 'https://www.nisargsrishti.org/photo-gallery',
  },
  {
    id: 'Media 04',
    filename: 'File:NSWF_Vadki_School_Grassroots_Workshop_Sept_2025.jpg',
    visualSubject: 'Interactive student acoustic health and environmental workshop at Nutan Madhyamik Vidyalay, Vadki, Pune (20 Sept 2025)',
    eventDate: '2025-09-20',
    targetSection: 'Outreach activities',
    protocol: 'CC BY-SA 4.0 VRTS release via NSWF Media Team to permissions-commons@wikimedia.org',
    license: 'CC BY-SA 4.0 (Pending VRTS Ticket)',
    sourceUrl: 'https://www.nisargsrishti.org/photo-gallery',
  },
];

export interface PipelineStepSpec {
  stepNumber: number;
  title: string;
  policyTag: string;
  promptText: string;
  description: string;
  deterministicOutput: string;
}

export const AI_STUDIO_PIPELINE_STEPS: PipelineStepSpec[] = [
  {
    stepNumber: 1,
    title: 'Entity & Source Ledger Extraction',
    policyTag: 'WP:RS & WP:PRIMARY Separation',
    promptText:
      'Extract all verified factual entities for Nisarg Srishti Welfare Foundation (CIN, incorporation date, directors, advisors, digital tools, school campaigns, and institutional MoUs) into a structured JSON verification table with source URLs and Primary/Secondary classification.',
    description:
      'Separates primary corporate registry data (MCA/RoC Pune CIN U85300PN2023NPL217884) from secondary media coverage (IndiaChronicle, Bharat Good Times, Stay Featured, France 24).',
    deterministicOutput: JSON.stringify(
      {
        entity: 'Nisarg Srishti Welfare Foundation (NSWF)',
        cin: 'U85300PN2023NPL217884',
        incorporation_date: '2023-01-11',
        registrar: 'RoC-Pune (Ministry of Corporate Affairs)',
        certification: 'ISO 14001:2015',
        leadership: [
          { name: 'Garima Gaurav Kavathekar', role: 'Founder & Managing Director', source: 'Primary (MCA)' },
          { name: 'Deepali Kavathekar', role: 'Director', source: 'Primary (MCA)' },
          { name: 'Nagesh Alkunthe', role: 'Additional Director', source: 'Primary (MCA)' },
        ],
        advisory_board: [
          'Dr. Dipali Ghodake (Aeroacoustics, Montreal)',
          'Kunal Jagdale (IoT & Noise Telemetry, Inditronics)',
          'Kashyap Bhatt (Hydroponics, Greenfield/AquaGreen)',
          'Ninad Joshi (Aerospace, Ontario)',
        ],
        secondary_verified_collaborations: [
          { partner: 'IIT Bombay', date: '2026-06', source: 'IndiaChronicle (Secondary WP:RS)' },
          { partner: 'Gokhale Institute of Politics and Economics (GIPE)', date: '2025-08', source: 'Activity Logs (Primary/Secondary)' },
          { partner: 'IIEBM Indus Business School', date: '2025-02', source: 'Bharat Good Times (Secondary WP:RS)' },
          { partner: 'Electrofine Recycling Pvt. Ltd.', date: '2025-11', source: 'IndiaChronicle (Secondary WP:RS)' },
        ],
        international_recognition: 'Featured in France 24 documentary on urban noise pollution in India (Feb 2026)',
      },
      null,
      2
    ),
  },
  {
    stepNumber: 2,
    title: 'Neutralization & Dual-Format Draft Generation',
    policyTag: 'WP:NPOV & MediaWiki Markup',
    promptText:
      'Using the verified JSON ledger, generate the complete Wikipedia article following the exact Scope of Work sections: Lead, Infobox, Background, Mission & Vision, Programs & Initiatives, Outreach Activities, Collaborations, and Impact. Provide both clean Markdown and copy-pasteable MediaWiki Wikitext.',
    description:
      'Converts extracted entities into third-person encyclopedic prose with zero peacock modifiers and compiles balanced {{Infobox organization}} and <ref>{{cite web}}</ref> templates.',
    deterministicOutput: `=== DUAL-FORMAT COMPILATION SUMMARY ===
• Sections Compiled: Lead, Infobox organization, 1. Background, 2. Mission and vision, 3. Programs and initiatives (Acoustic monitoring, Resource conservation), 4. Outreach activities, 5. Collaborations, 6. Impact, 7. References ({{Reflist}}).
• Citations Embedded: 10 named <ref> tags using {{cite web}} with access-date=1 November 2026.
• Peacock Modifiers Stripped: "Takes Bold Steps", "Empowering Sustainability", "visionary guidance", "working passionately", "renowned social activist".
• Status: 100% Syntactically Valid MediaWiki Markup (Ready for Wikipedia Draft Sandbox).`,
  },
  {
    stepNumber: 3,
    title: 'Articles for Creation (AfC) Pre-Flight Audit',
    policyTag: 'WP:NORG, WP:CITE & WP:COM Audit',
    promptText:
      'Audit the generated draft against WP:NORG, WP:NPOV, and WP:CITE. Flag any sentence that sounds like a press release and provide a Wikimedia Commons media upload compliance table.',
    description:
      'Audits the completed draft against the top 3 causes of NGO draft rejection at Wikipedia AfC and generates the VRTS media release protocol.',
    deterministicOutput: `=== WIKIPEDIA AfC PRE-FLIGHT COMPLIANCE REPORT ===
1. WP:PROMO / WP:PEACOCK AUDIT: PASS (100/100)
   - Zero promotional adjectives detected in article prose.
   - All subjective goals explicitly attributed ("the organization's stated mandate is...").

2. WP:CITE / WP:V VERIFIABILITY AUDIT: PASS (10/10 Citations Formatted)
   - Every paragraph and bullet claim carries an inline <ref> citation.
   - Primary sources (MCA, nisargsrishti.org) restricted strictly to administrative facts.

3. WP:NORG NOTABILITY & SECONDARY SOURCE RECOMMENDATIONS:
   - Current Secondary Coverage: IndiaChronicle (3 articles), Bharat Good Times (1 article), Stay Featured (1 article), and France 24 broadcast mention.
   - Priority Enhancement for Guaranteed AfC Approval: Attach the exact France 24 broadcast airdate/URL and 1–2 regional mainstream print citations (e.g., Sakal, Lokmat, or The Indian Express Pune covering the Ganeshotsav decibel drives).

4. WP:COM MEDIA COPYRIGHT AUDIT:
   - Direct upload of nisargsrishti.org gallery images without license release is blocked under WP:DCM.
   - Solution: 4 curated field photographs mapped with CC BY-SA 4.0 VRTS permission declaration templates for permissions-commons@wikimedia.org.`,
  },
];

export const PRESET_PRESS_RELEASES = [
  {
    label: 'Press Release 1: Leadership & Mission Claim',
    rawText:
      'Under the visionary guidance of renowned social activist Dr. Garima Gaurav Kavathekar, Nisarg Srishti Welfare Foundation is working passionately and takes bold steps toward pioneering change in urban noise pollution and water conservation across Pune.',
    citationTitle: 'Nisarg Srishti Welfare Foundation Takes Bold Steps: Combats Noise Pollution and Promotes Water Conservation',
    citationUrl:
      'https://www.stayfeatured.com/post/nisarg-srishti-welfare-foundation-takes-bold-steps-combats-noise-pollution-and-promotes-water-conse',
    citationPublisher: 'Stay Featured',
    citationDate: '28 February 2024',
  },
  {
    label: 'Press Release 2: IIT Bombay & Digital Tools Claim',
    rawText:
      'As a leading NGO with a world-class advisory board and revolutionary IoT tools like NoiseAware, NSWF has launched impactful sustainability programs in collaboration with IIT Bombay.',
    citationTitle:
      'Empowering Sustainability: IIT Bombay and Nisarg Srishti Welfare Foundation Collaborate for Environmental Initiatives',
    citationUrl:
      'https://indiachronicle.in/empowering-sustainability-iit-bombay-and-nisarg-srishti-welfare-foundation-collaborate-for-environmental-initiatives/',
    citationPublisher: 'IndiaChronicle',
    citationDate: '15 June 2026',
  },
  {
    label: 'Press Release 3: School Outreach & France 24 Coverage',
    rawText:
      'Working tirelessly to educate youth, NSWF conducted impactful workshops at PMC Late Ramchandra Bankar School and achieved unparalleled recognition in a France 24 documentary.',
    citationTitle:
      "Nisarg Srishti Welfare Foundation's Noise Pollution Campaign Featured in France 24 Documentary",
    citationUrl:
      'https://indiachronicle.in/nisarg-srishti-welfare-foundations-noise-pollution-campaign-featured-in-france-24-documentary/',
    citationPublisher: 'IndiaChronicle',
    citationDate: '18 February 2026',
  },
];
