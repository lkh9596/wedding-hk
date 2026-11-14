# Ken & Man Man’s wedding

A bilingual English / Hong Kong Chinese wedding site for April 3, 2027 in Seoul.
Built with Next.js and exported as a static site.

- `npm run dev` starts the development server.
- `npm run build` exports the production site to `out/`.
- `npm run lint` checks the source.

A push to `main` deploys to **kenkenandmanman.com** through GitHub Actions and GitHub Pages.

Translations live in `src/translations/en.json` and `src/translations/zh-HK.json`.
The two files must have matching keys. Add new UI strings to both.

Every new photo must go through `scripts/optimize-images.py` (requires Pillow),
which preserves ICC colour profiles while removing EXIF and XMP. For example:

```sh
python3 scripts/optimize-images.py originals/photo.jpg --output-dir public --max-width 1080 --quality 78
python3 scripts/optimize-images.py --check public
```

Use `--square --max-width 600` for a hero portrait. Never overwrite originals;
keep them outside `public/`. Update `src/lib/imageSizes.ts` with each output’s
pixel dimensions and use lazy loading for every photo except the hero.
