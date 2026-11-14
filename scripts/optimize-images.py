#!/usr/bin/env python3
"""Pre-size photos, preserve colour profiles, and remove private metadata.

Usage: python3 scripts/optimize-images.py photo.jpg -o public --max-width 1080
       python3 scripts/optimize-images.py portrait.jpg -o public --max-width 600 --square
       python3 scripts/optimize-images.py --check public
"""

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def check(directory: Path) -> bool:
    failures = []
    extensions = Image.registered_extensions()
    for path in sorted(directory.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in extensions:
            continue
        with Image.open(path) as image:
            exif = image.getexif()
            if 34853 in exif:
                failures.append(f"{path}: EXIF GPS")
            if set(exif) - {274}:  # Orientation is the only permitted EXIF tag.
                failures.append(f"{path}: EXIF beyond orientation")
            if any("xmp" in key.lower() for key in image.info) or (
                hasattr(image, "getxmp") and image.getxmp()
            ):
                failures.append(f"{path}: XMP")
    for failure in failures:
        print(failure)
    if not failures:
        print(f"Metadata check passed: {directory}")
    return not failures


def optimize(source: Path, target: Path, max_width: int, quality: int, square: bool):
    with Image.open(source) as original:
        icc_profile = original.info.get("icc_profile")
        image = ImageOps.exif_transpose(original)
        if square:
            side = min(image.size)
            left, top = (image.width - side) // 2, (image.height - side) // 2
            image = image.crop((left, top, left + side, top + side))
        if image.width > max_width:
            height = max(1, round(image.height * max_width / image.width))
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        # Copy pixels into a fresh image so no source EXIF/XMP can be inherited.
        mode = "RGBA" if image.mode in ("RGBA", "LA") or "transparency" in image.info else "RGB"
        pixels = Image.new(mode, image.size)
        pixels.paste(image.convert(mode))
        pixels.save(target, "WEBP", quality=quality, method=6, icc_profile=icc_profile)
        print(f"{source} -> {target} ({pixels.width}x{pixels.height}, {target.stat().st_size:,} bytes)")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("inputs", type=Path, nargs="*")
    parser.add_argument("-o", "--output-dir", type=Path)
    parser.add_argument("--max-width", type=int, default=1080)
    parser.add_argument("--quality", type=int, default=78)
    parser.add_argument("--square", action="store_true", help="Center-crop before resizing (hero portraits)")
    parser.add_argument("--check", type=Path, metavar="DIR")
    args = parser.parse_args()
    if args.check:
        if not args.check.is_dir():
            parser.error("--check requires an existing directory")
        if args.inputs or args.output_dir:
            parser.error("--check cannot be combined with conversion inputs")
        return 0 if check(args.check) else 1
    if not args.inputs or not args.output_dir:
        parser.error("conversion requires input paths and --output-dir")
    if args.max_width < 1 or not 0 <= args.quality <= 100:
        parser.error("max width must be positive; quality must be between 0 and 100")
    sources = {source.resolve() for source in args.inputs}
    targets = [args.output_dir / f"{source.stem}.webp" for source in args.inputs]
    if any(target.resolve() in sources for target in targets):
        parser.error("refusing to overwrite an input file")
    if len({target.resolve() for target in targets}) != len(targets):
        parser.error("input basenames must be unique")
    args.output_dir.mkdir(parents=True, exist_ok=True)
    for source, target in zip(args.inputs, targets):
        optimize(source, target, args.max_width, args.quality, args.square)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
