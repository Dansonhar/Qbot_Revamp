#!/usr/bin/env bash
# Re-encodes source footage into the exact ratio each slot renders at.
# Cropping here (not with object-cover) means we never ship pixels the layout throws away.
set -euo pipefail
SRC="/Users/crave/Downloads"
OUT="/Users/crave/Downloads/DANSON/qbot/public/video"
POS="/Users/crave/Downloads/DANSON/qbot/public/images/poster"
mkdir -p "$OUT" "$POS"

# crf 27 / preset slow is the quality floor that still looks clean on a dark page at these sizes.
ENC=(-c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -an -movflags +faststart)

# enc <outname> <w> <h> <seek> <dur> <srcfile> [extra crop filter]
enc () {
  local name=$1 w=$2 h=$3 ss=$4 t=$5 file=$6 pre=${7:-}
  local vf="${pre}scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}"
  ffmpeg -v error -y -ss "$ss" -t "$t" -i "$SRC/$file" -vf "$vf" "${ENC[@]}" "$OUT/$name.mp4"
  # Poster at t=0.3 of the OUTPUT so still and film are pixel-identical in the same slot.
  ffmpeg -v error -y -ss 0.3 -i "$OUT/$name.mp4" -frames:v 1 -q:v 4 "$POS/$name.jpg"
  printf "%-22s %s\n" "$name" "$(du -h "$OUT/$name.mp4" | cut -f1)"
}

# ── hero: wide architectural establishing shot ────────────────────────────
enc hero            1600 900 0   8  "Gym_kiosk_and_turnstile_operation_202608041009.mp4"
# ── problem band: 21:9 cinema, a staffed counter with a queue ─────────────
enc problem         1600 686 4   9  "young-man-making-order-in-modern-cafe-2026-01-21-13-36-16-utc.mp4"

# ── industry selector previews (16:9) ─────────────────────────────────────
enc ind-fnb         1120 630 0   9  "two-cafe-workers-takes-cookies-with-cup-of-coffee-2026-01-22-15-22-03-utc.mp4"
enc ind-gym         1120 630 0  10  "Man_entering_gym_through_gate_202609021110.mp4"
enc ind-salon       1120 630 0  10  "Woman_using_salon_kiosk_202609011544.mp4"
enc ind-attractions 1120 630 0  10  "Family_buying_tickets_at_kiosk_202609041430.mp4"
enc ind-hotel       1120 630 0   8  "themepark webstore.mp4"
enc ind-clinic      1120 630 0  10  "Woman_checking_in_at_kiosk_202609011521.mp4"

# ── hardware tiles (4:5 portrait, one shared ratio across stills + film) ──
# Kiosk.mp4 carries a baked-in "Modern Vertical Design" caption on its right third.
# Crop from x=374 (not centred) so the caption falls outside the frame.
enc hw-kiosk         720 900 0   7  "Kiosk.mp4" "crop=864:1080:374:0,"
enc hw-gate          720 900 2  10  "hf_20260810_012103_60818e94-7760-4884-96eb-0eba725c10a5.mp4"
enc hw-boosters      720 900 18 10  "QPOS-Kiosk-SaveManpower.mp4"

# ── before / after pairs (16:9) ───────────────────────────────────────────
enc pair-counter     896 504 0   6  "themepark pos.mp4"
enc pair-kiosk       896 504 0   6  "Kiosk themepark .mp4"
enc pair-desk        896 504 0  10  "Member_checking_in_at_kiosk_202609041428.mp4"
enc pair-gate        896 504 0   6  "Woman_using_face_ID_scanner_202608070957.mp4"
