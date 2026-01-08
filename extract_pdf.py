import sys
import importlib.util

def check_install(package):
    spec = importlib.util.find_spec(package)
    return spec is not None

packages = ['PyPDF2', 'pdfminer', 'pypdf']
available = [p for p in packages if check_install(p)]
print(f"Available PDF packages: {available}")

if not available:
    print("No PDF libraries found.")
    sys.exit(0)

try:
    if 'pypdf' in available:
        from pypdf import PdfReader
        reader = PdfReader("d:/my_portfolio/assets/cv_210407R_compressed.pdf")
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print("EXTRACTED_TEXT_START")
        print(text)
        print("EXTRACTED_TEXT_END")
    elif 'PyPDF2' in available:
        import PyPDF2
        with open("d:/my_portfolio/assets/cv_210407R_compressed.pdf", 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            print("EXTRACTED_TEXT_START")
            print(text)
            print("EXTRACTED_TEXT_END")
except Exception as e:
    print(f"Error extracting text: {e}")
