# Milan Study Spots

A student-curated guide to libraries, cafés, coworking spaces, and campus study rooms in Milan. The guide is curated by Ahmed, an MSc Mechanical Engineering student at Politecnico di Milano, and focuses on practical details: noise, outlets, cost, opening hours, and tips for a good study session.

Built with [Lovable](https://lovable.dev).

- **Project editor:** [Open Milan Study Spots in Lovable](https://lovable.dev/projects/c41571f6-0230-4a3a-9524-a618e4f7cf92)
- **Preview:** [Open the project preview](https://id-preview--c41571f6-0230-4a3a-9524-a618e4f7cf92.lovable.app)
- **Publication:** no published URL is currently confirmed; the preview is not a production link.

## What the app includes

| Page | Path | Contents |
| --- | --- | --- |
| Home | `/` | Introduction and three featured study spots |
| All spots | `/spots` | All locations, photos, filters, and a matching-result count |
| Spot details | `/spots/$slug` | Photo, study recommendation, insider tip, noise, price, outlets, hours, address, and traits |
| About | `/about` | Curator background and the guide's editorial method |

Each content page has its own title, description, and social metadata. Unknown location slugs display a not-found message with a link back to the directory.

### Filtering behavior

- Select multiple **types** or **neighborhoods** to match any selected value within that group.
- Select multiple **traits** to require all selected traits.
- The three groups are combined: a spot must satisfy each active group.
- Filter options are derived from the spot data, not maintained as separate lists.
- **Clear filters** resets every selection; no matches displays an empty-result message.
- Filters currently live in page state, not the URL, and are not saved between visits.

## Current locations

1. Biblioteca Nazionale Braidense
2. Biblioteca Centrale di Architettura (PoliMi)
3. Biblioteca Comunale Sormani
4. Fondazione Feltrinelli
5. The Seed Milano
6. Combo Milano
7. Pavé
8. Gogol & Company
9. Sala Studio Via Venezian 15
10. oTTo

The home page features the **first three entries** in the data array. Reordering the array changes the featured selection and directory order.

## Technology

- **React 19** and **TypeScript** for the interface and typed content.
- **TanStack Start / TanStack Router** for the application and file-based routing.
- **Vite** for development and production builds.
- **Tailwind CSS v4** for styling, with semantic theme tokens in `src/styles.css`.
- **Fraunces** and **Work Sans**, loaded through the root page's font links.
- **Lovable Assets** for CDN-hosted location photos.
- **Vitest** for tests and **ESLint / Prettier** for code quality and formatting.

The current guide uses a static TypeScript data array. There is no connected database, account system, booking flow, or content-management dashboard. Editing content requires a source change.

## Local development

Install a current Node.js LTS release and [Bun](https://bun.sh). Clone this repository using its actual repository URL, then open the repository folder:

```sh
bun install
bun run dev
```

Open the local address printed by Vite. The Lovable sandbox uses port `8080`; local settings may differ.

The current static guide does not require application API keys or database credentials. Photo URLs use Lovable's asset-serving infrastructure; verify their availability when hosting outside Lovable.

### Available commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Create a production build |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview the build locally |
| `bun run test` | Run the test suite once |
| `bun run test:watch` | Run tests in watch mode |
| `bun run lint` | Run ESLint |
| `bun run format` | Format the project with Prettier; this modifies files |

## Project structure

```text
src/
├── assets/                  # CDN asset pointer JSON files
├── components/
│   └── SpotBits.tsx          # Spot cards, photos, noise indicators, header, footer
├── data/
│   └── spots.ts             # All location content and lookup helpers
├── routes/
│   ├── __root.tsx           # Shared page shell, fonts, error and not-found UI
│   ├── index.tsx            # Home page
│   ├── spots.index.tsx      # Filterable directory
│   ├── spots.$slug.tsx      # Individual location pages
│   └── about.tsx            # Curator and editorial information
├── test/
│   └── app-routing.test.tsx # Root-route matching smoke test
├── router.tsx               # Router setup
├── routeTree.gen.ts         # Generated route tree; do not edit manually
└── styles.css               # Shared styling and theme tokens
```

Read `AGENTS.md` before changing project structure or photo handling.

## Editing or adding a study spot

All location content is maintained in **`src/data/spots.ts`**. Edit an existing object, or add an object to the exported `spots` array that satisfies the `Spot` type.

| Field | Expected value |
| --- | --- |
| `name` | Location name; also used to generate its URL slug |
| `type` | `library`, `café`, `coworking`, or `campus` |
| `neighborhood` | Area label shown on cards and in filters |
| `address` | Address text shown on the detail page |
| `traits` | Array of descriptive tags; values are matched exactly |
| `noise` | Integer from `1` (quietest) to `5` (liveliest) |
| `price` | `free`, `€`, `€€`, or `€€€`; euro symbols are cost tiers, not exact prices |
| `hours` | Opening-hours text; retain a verification note where uncertain |
| `bestFor` | Short study recommendation |
| `insider` | Practical tip shown on the detail page |
| `photo` | Imported asset pointer's `.url` |
| `photoCredit` | Optional credit, displayed over the photo when supplied |

The helpers `slugify`, `getSpot`, and `featuredSpots` derive links, look up locations, and select featured entries. Slugs remove accents, lowercase names, and replace punctuation or spaces with hyphens. For example, `Pavé` becomes `/spots/pave`.

**Keep names and resulting slugs unique.** Renaming a location changes its URL; redirects for old names are not currently implemented. Use consistent trait spelling, because different strings become different filters. The outlets row displays **Yes** only when the traits contain the exact value `outlets`; otherwise it says **Not noted**.

## Photos and credits

All ten locations currently use photos uploaded by the project owner. Cards and detail pages share the same `photo` value from the data array. Images are cropped to fit their display area; failed image loads show the neighborhood and a “Photo coming soon” fallback.

Photo files are hosted through **Lovable Assets**. The repository stores `.asset.json` pointers instead of the uploaded binaries. To use a pointer:

```tsx
import locationPhoto from "@/assets/otto-upload.webp.asset.json";

// Inside a spot object:
photo: locationPhoto.url,
```

To replace a photo, upload it in the Lovable chat and identify the location. In a configured Lovable sandbox, you can also create a new pointer with the asset CLI:

```sh
lovable-assets create --file /tmp/location-photo.jpg --filename location-photo.jpg > src/assets/location-photo.jpg.asset.json
```

Import the returned pointer in `spots.ts` and assign its `.url`. Do not hand-write asset IDs or store the pointer object itself in `photo`. Do not delete older hosted assets without checking whether earlier app versions still reference them.

### Current photo mapping

| Location | Pointer file in `src/assets/` |
| --- | --- |
| Braidense | `braidense-upload.jpg.asset.json` |
| PoliMi architecture library | `polimi-upload.jpg.asset.json` |
| Sormani | `sormani-upload.jpg.asset.json` |
| Fondazione Feltrinelli | `feltrinelli-upload.jpg.asset.json` |
| The Seed | `the-seed-upload.webp.asset.json` |
| Combo | `combo-upload.jpg.asset.json` |
| Pavé | `pave-upload.jpg.asset.json` |
| Gogol & Company | `gogol-upload.jpg.asset.json` |
| Via Venezian | `venezian-upload.jpg.asset.json` |
| oTTo | `otto-upload.webp.asset.json` |

The unnamed uploads were matched by appearance: `images_1.jpg` to Sormani, `images_2.jpg` to Combo, and `images_3.jpg` to Via Venezian. These matches have not been independently confirmed.

**Photo rights:** the owner supplied images found through Google and accepted responsibility for their use. This is not evidence of a reuse license or photographer permission. Confirm rights and any required attribution before public distribution. Previous Wikimedia credits were removed from the replaced images because they did not identify the new uploads' photographers.

## Verification and known limitations

- All ten current photos were checked loading in the directory and on their individual location pages after being added.
- The automated suite currently contains a root-route matching smoke test; it does **not** cover filtering, content accuracy, or photo availability.
- Several addresses, opening hours, and access details are draft information or explicitly marked for verification. Check them with each venue before relying on them.
- The site's “personally visited” and “no sponsored listings” statements are editorial claims maintained by the curator, not independently verified by the software.
- Image identity, reuse rights, and credit requirements still need owner confirmation where noted above.
- There is no live venue-hours feed, seat availability, map view, or reservation system.

After changing content or photos, check `/spots`, use the filters, open the affected detail page, and confirm that its image and facts match the intended location. Run the tests after code changes.

## Continuing development and publishing

Continue editing in the linked Lovable project or work locally with this repository. Before publishing, confirm venue details, photo rights, and the directory/detail pages. Publish through Lovable when ready, then replace the preview-only publication note above with the confirmed public URL.

The production configuration uses Lovable's TanStack/Vite integration with a Cloudflare build target. Other hosting environments may require deployment and asset-serving adjustments; this is not a plain static HTML export.
