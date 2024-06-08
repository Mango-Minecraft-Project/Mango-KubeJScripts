import json
from pathlib import Path

SCRIPT_DIR = Path("scripts")

for script_dir in SCRIPT_DIR.iterdir():
    with open(script_dir / ".kjspkg", encoding="utf8") as f:
        author = json.load(f)["author"]
    print(f"- [{script_dir.name.replace("_", " ")} by {author}](./{script_dir.name})")