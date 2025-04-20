from PIL import Image
import os

# === CONFIG ===
input_image_path = "photos/2000/3jz.jpg"   # Your input image
output_dir = "photos/2000"               # Folder to save tiles
prefix = "1_"                            # Naming pattern

# === Load Image ===
image = Image.open(input_image_path)
width, height = image.size
tile_width = width // 3
tile_height = height // 3

# === Create output folder if needed ===
os.makedirs(output_dir, exist_ok=True)

# === Slice into 3x3 grid ===
count = 1
for row in range(3):
    for col in range(3):
        left = col * tile_width
        upper = row * tile_height
        right = left + tile_width
        lower = upper + tile_height

        tile = image.crop((left, upper, right, lower))
        tile_path = os.path.join(output_dir, f"{prefix}{count}.jpg")
        tile.save(tile_path)
        print(f"Saved {tile_path}")
        count += 1

print("✅ Done slicing the image into 3x3 tiles.")
