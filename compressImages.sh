#!/bin/bash

# Resizing and compressing the tile images
for dir in "src/images/tiles"; do
  # Loop over the files in the directory
  for file in $dir/*; do
    # Get the file extension
    extension="${file##*.}"
    # Compress the file if it is a png
    if [ "$extension" = "png" ]; then
      cwebp -resize 512 0 -q 20 -m 6 $file -o ${dir/compressed}/$(basename $file '.png').webp
    fi
  done
done

# Not resizing the rule images since dimensions very
for dir in "src/images/rule_illustrations"; do
  # Loop over the files in the directory
  for file in $dir/*; do
    # Get the file extension
    extension="${file##*.}"
    # Compress the file if it is a png
    if [ "$extension" = "png" ]; then
      cwebp -q 20 -m 6 $file -o ${dir/compressed}/$(basename $file '.png').webp
    fi
  done
done
