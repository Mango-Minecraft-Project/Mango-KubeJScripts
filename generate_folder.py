from pathlib import Path
import json

SCRIPT_DIRECTORY = Path("scripts/")

while 1:
    name = input(">>> Script Name:\n... ")

    created_directory = SCRIPT_DIRECTORY / name.replace(" ", "_")
    created_directory.mkdir(parents=True, exist_ok=True)

    with open(created_directory / "README.md", "w", encoding="utf8") as file:
        file.write(
            "\n".join(
                [
                    f"# {name.title()}｜...",
                    "",
                    "...",
                    "",
                    "## Dependencies｜前置",
                    "",
                    "- None｜無",
                ]
            )
        )
    with open(created_directory / ".kjspkg", "w", encoding="utf8") as file:
        json.dump(
            {
                "author": "EvanHsieh0415",
                "description": "...",
                "versions": [9, 10],
                "modloaders": ["forge"],
                "dependencies": ["mod:"],
            },
            file,
            indent=2,
            ensure_ascii=False,
        )

    if input(">>> continue?\n... ").lower() in {"n", "no"}:
        break
