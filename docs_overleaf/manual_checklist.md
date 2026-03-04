# Manual Overleaf Checklist

Here are the specific placeholders and images you need to manually update once you upload the `src/docs_overleaf` folder to your Overleaf project:

## 1. Text Placeholders to Fill In:
### `coverpage.tex`
- `[Your Reg Number]`
- `[Your Faculty Name]`

### `certificate.tex`
- `[Your Reg Number]`
- `[Faculty Guide Name]`
- `[Coordinator Name]`
- `[Examiner Name]`

### `acknowledgement.tex`
- `[Faculty Guide Name]` (Next to Prof. Bindiya M Varghese)
- `[Coordinator Name]`

## 2. Images to Replace
You need to generate or take screenshots for the following and replace the files (ensure the filenames match or update the `.tex` files to reflect your new filenames):
- **`git_history_screenshot.png`**: A screenshot of your project's commit history (used in `7_Git_History.tex`).
- **`git_folder_structure.png`**: A screenshot of your repository's folder structure (used in `7_Git_History.tex`).

*(Note: I successfully captured `home.png`, `login.png`, and `register.png` frontend screenshots automatically. I also successfully copied `RCSS.png` and `project_pipe.png` (the original pipeline diagram) from your template. I have also automatically generated `use_case_diagram.png`, `er_diagram.png`, `architecture_diagram.png`, `activity_diagram.png`, `sequence_diagram.png` and `folder_structure.png` using Mermaid. These are already present in the folder and linked correctly in the LaTeX files!)*

## 3. Formatting Checks
- **Page Numbers**: Ensure the Roman numeral numbering works correctly for the intro pages and switches to Arabic for Chapter 1.
- **Table of Contents**: Compile the project **twice** in Overleaf so the Table of Contents, List of Figures, and References map to the correct page numbers.
