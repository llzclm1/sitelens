"""Record a local, reproducible SiteLens product-flow demo for launch materials."""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path

from playwright.sync_api import sync_playwright


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default="http://127.0.0.1:3000")
    parser.add_argument("--output", default="outputs/launch-assets/sitelens-demo.mp4")
    args = parser.parse_args()

    output = Path(args.output).resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    recording_dir = output.parent / ".demo-recording"
    recording_dir.mkdir(exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=1,
            record_video_dir=str(recording_dir),
            record_video_size={"width": 1440, "height": 900},
        )
        page = context.new_page()
        page.goto(f"{args.base_url}/", wait_until="domcontentloaded", timeout=15000)
        page.wait_for_timeout(3000)
        page.locator("#url").fill("https://sitelens.win")
        page.wait_for_timeout(2000)
        page.get_by_role("button", name="Analyze a site").click()
        page.wait_for_url("**/report/*", timeout=15000)
        page.wait_for_timeout(4000)
        page.evaluate("window.scrollTo({ top: 720, behavior: 'smooth' })")
        page.wait_for_timeout(4500)
        page.evaluate("window.scrollTo({ top: 1550, behavior: 'smooth' })")
        page.wait_for_timeout(4500)
        recorded_video = page.video
        context.close()
        if recorded_video is None:
            raise RuntimeError("Playwright did not produce a video")
        source = Path(recorded_video.path())
        browser.close()

    temporary_output = output.with_suffix(".webm")
    shutil.copyfile(source, temporary_output)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(temporary_output),
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(output),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    temporary_output.unlink()
    shutil.rmtree(recording_dir, ignore_errors=True)
    print(output)


if __name__ == "__main__":
    main()
