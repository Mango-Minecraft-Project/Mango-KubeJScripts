from pathlib import Path

SCRIPT_DIR = Path("scripts")

for script_dir in SCRIPT_DIR.iterdir():
    print(f"- [{script_dir.name.replace("_", " ")}](./{script_dir.name})")