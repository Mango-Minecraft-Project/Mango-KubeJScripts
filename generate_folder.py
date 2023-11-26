import os

while 1:
    name = input(">>> Script Name:\n... ")
    folder_path = "scripts/" + name.replace(" ", "_")

    try:
        os.mkdir(folder_path)
    except FileExistsError:
        pass

    with open(f"{folder_path}/README.md", "w", encoding="utf8") as file:
        file.write(
            f"# {name} | ...\n\n"
            "...\n\n"
            "## 前置\n"
            "- 模組\n"
            "  - ...\n"
        )

    if input(">>> continue?\n... ").lower() in {"n", "no"}:
        break
