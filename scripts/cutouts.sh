#!/usr/bin/env bash
# The hardware renders ship on pure white. Keying it away puts the product straight onto the
# page ink, so the tiles read as one dark grid instead of three glowing white rectangles.
# Tolerance 0.01: at 0.05 the key already starts eating the kiosk's own light-grey body.
# Every product is framed to the same fraction of tile height, so the grid stays even
# even though a Stand and a Duo are nothing like the same shape.
set -euo pipefail
SRC="/Users/crave/Downloads/DANSON/qbotweb2026-main/public"
OUT="/Users/crave/Downloads/DANSON/qbot/public/images/hardware"
mkdir -p "$OUT"
KEY="colorkey=0xffffff:0.01:0.02"

make_tile () {
  local name=$1 file=$2 src=$3
  local bbox bw bh bx by
  # Composite over black first — cropdetect needs the keyed region to actually BE black,
  # and format=rgb24 alone just drops alpha and leaves the white behind.
  bbox=$(ffmpeg -hide_banner -loglevel info -y -f lavfi -t 0.3 -i "color=black:s=${src}x${src}" \
      -loop 1 -t 0.3 -i "$SRC/$file" \
      -filter_complex "[1]${KEY}[fg];[0][fg]overlay,cropdetect=limit=16:round=2:reset=0" \
      -f null - 2>&1 | grep -o "crop=[0-9]*:[0-9]*:[0-9]*:[0-9]*" | tail -1 | sed 's/crop=//')
  bw=${bbox%%:*}; bbox=${bbox#*:}
  bh=${bbox%%:*}; bbox=${bbox#*:}
  bx=${bbox%%:*}; by=${bbox#*:}

  # 12% total headroom, then widen to 4:5 around the product's own centre.
  local h=$(( bh * 112 / 100 ))
  local w=$(( h * 4 / 5 ))
  local y=$(( by + bh / 2 - h / 2 ))
  local x=$(( bx + bw / 2 - w / 2 ))
  # clamp inside the source
  [ "$h" -gt "$src" ] && { h=$src; w=$(( h * 4 / 5 )); }
  [ "$w" -gt "$src" ] && { w=$src; h=$(( w * 5 / 4 )); }
  [ "$y" -lt 0 ] && y=0; [ "$x" -lt 0 ] && x=0
  [ $(( y + h )) -gt "$src" ] && y=$(( src - h ))
  [ $(( x + w )) -gt "$src" ] && x=$(( src - w ))

  ffmpeg -v error -y -i "$SRC/$file" \
    -vf "${KEY},crop=${w}:${h}:${x}:${y},scale=720:900:flags=lanczos" \
    -frames:v 1 "$OUT/$name.png"
  printf "%-12s bbox %sx%s → crop %sx%s+%s+%s → %s\n" \
    "$name" "$bw" "$bh" "$w" "$h" "$x" "$y" "$(du -h "$OUT/$name.png" | cut -f1)"
}

make_tile q1-stand   "Q_STAND_1.webp"      4500
make_tile q1-desktop "QBOT_DEKSTOP_1.webp" 4500
make_tile q1-duo     "qduo-v2.webp"        1200
