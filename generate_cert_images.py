import os
from PIL import Image, ImageDraw, ImageFont

def create_certificates():
    cert_dir = os.path.join(os.getcwd(), "assets", "certificates")
    os.makedirs(cert_dir, exist_ok=True)

    # 1. LangChain Academy
    img = Image.new("RGB", (1200, 840), color="#edf4ff")
    draw = ImageDraw.Draw(img)

    # Soft ambient background shapes
    draw.rectangle([40, 40, 1160, 800], outline="#cbd5e1", width=2)

    # Text content
    draw.text((600, 140), "Course Completed", fill="#2563eb", anchor="mm", font_size=42)
    draw.text((600, 220), "This Certificate is Awarded To", fill="#475569", anchor="mm", font_size=24)
    draw.text((600, 290), "Nithin Asi", fill="#1d4ed8", anchor="mm", font_size=52)
    draw.text((600, 370), "For Successfully Completing The Course", fill="#475569", anchor="mm", font_size=22)
    draw.text((600, 440), "Foundation: Introduction to LangChain - Python", fill="#0f172a", anchor="mm", font_size=36)

    # Logo
    draw.text((600, 580), "🦜🔗 LangChain Academy", fill="#000000", anchor="mm", font_size=40)

    # Footer
    draw.text((100, 750), "Issued: 2026-09-05", fill="#64748b", font_size=20)
    draw.text((600, 750), "Valid Thru: 2028-09-04", fill="#64748b", anchor="mm", font_size=20)
    draw.text((1100, 750), "Certificate ID: 5dgafuzqmz", fill="#64748b", anchor="ra", font_size=20)

    img.save(os.path.join(cert_dir, "langchain_certificate.png"))

    # 2. HackerRank Python (Basic)
    img = Image.new("RGB", (1200, 840), color="#ffffff")
    draw = ImageDraw.Draw(img)

    # Intricate border
    draw.rectangle([30, 30, 1170, 810], outline="#e2e8f0", width=4)
    draw.rectangle([45, 45, 1155, 795], outline="#00ea64", width=2)

    # Icon / Logo
    draw.rectangle([560, 80, 640, 140], fill="#00ea64")
    draw.text((600, 110), "H", fill="#000000", anchor="mm", font_size=36)

    draw.text((600, 200), "Certificate of Accomplishment", fill="#0f172a", anchor="mm", font_size=44)

    # Dark Ribbon Badge
    draw.rectangle([300, 260, 900, 330], fill="#1e293b")
    draw.text((600, 295), "Python (Basic)", fill="#ffffff", anchor="mm", font_size=32)

    draw.text((600, 390), "PRESENTED TO", fill="#94a3b8", anchor="mm", font_size=20)
    draw.text((600, 460), "Nithin Asi", fill="#0f172a", anchor="mm", font_size=56)

    draw.line([250, 520, 950, 520], fill="#cbd5e1", width=2)
    draw.text((600, 570), "The bearer of this certificate has passed the HackerRank skill certification test", fill="#475569", anchor="mm", font_size=22)

    # Footer
    draw.text((100, 730), "Earned on: 02 Jul, 2026", fill="#0f172a", font_size=20)
    draw.text((100, 760), "ID: 2883B4F723E2", fill="#64748b", font_size=18)
    draw.text((1100, 730), "Harishankaran K", fill="#0f172a", anchor="ra", font_size=22)
    draw.text((1100, 760), "CTO, HackerRank", fill="#64748b", anchor="ra", font_size=18)

    img.save(os.path.join(cert_dir, "hackerrank_python_certificate.png"))

    # Helper function for Kaggle certificates
    def create_kaggle_cert(title, date_str, instructor, filename):
        img = Image.new("RGB", (1200, 840), color="#ffffff")
        draw = ImageDraw.Draw(img)

        # Border
        draw.rectangle([50, 50, 1150, 790], outline="#1e293b", width=8)

        # Kaggle Blobs top right
        draw.ellipse([800, -50, 1100, 250], fill="#facc15")
        draw.ellipse([950, 100, 1250, 400], fill="#22c55e")
        draw.ellipse([980, 200, 1280, 500], fill="#20beff")

        # Kaggle logo
        draw.text((120, 120), "kaggle", fill="#20beff", font_size=54)
        draw.text((120, 185), "CERTIFICATE OF COMPLETION", fill="#64748b", font_size=18)

        # Name
        draw.text((120, 280), "Nithin Asi", fill="#0f172a", font_size=60)
        draw.text((120, 350), "HAS SUCCESSFULLY COMPLETED THE COURSE", fill="#64748b", font_size=18)

        # Course Title
        draw.text((120, 440), title, fill="#0f172a", font_size=42)
        draw.line([120, 490, 800, 490], fill="#cbd5e1", width=2)

        # Date
        draw.text((120, 520), f"ON {date_str.upper()}", fill="#64748b", font_size=18)

        # Signatures
        draw.text((120, 640), instructor, fill="#0f172a", font_size=22)
        draw.text((120, 670), f"{instructor.split(',')[0].upper()}, KAGGLE INSTRUCTOR", fill="#64748b", font_size=16)

        draw.text((600, 640), "Alexis Cook", fill="#0f172a", font_size=22)
        draw.text((600, 670), "ALEXIS COOK, HEAD OF KAGGLE LEARN", fill="#64748b", font_size=16)

        img.save(os.path.join(cert_dir, filename))

    create_kaggle_cert("Pandas", "August 28, 2026", "Aleksey Bilogur", "kaggle_pandas_certificate.png")
    create_kaggle_cert("Python", "April 4, 2026", "Colin Morris", "kaggle_python_certificate.png")
    create_kaggle_cert("Intro to Machine Learning", "May 9, 2026", "Dan Becker", "kaggle_ml_certificate.png")

    # 6. Cisco Python Essentials
    img = Image.new("RGB", (1200, 840), color="#f8fafc")
    draw = ImageDraw.Draw(img)

    draw.rectangle([40, 40, 1160, 800], outline="#049fd9", width=4)
    draw.rectangle([300, 70, 900, 140], fill="#049fd9")
    draw.text((600, 105), "CISCO NETWORKING ACADEMY", fill="#ffffff", anchor="mm", font_size=28)

    draw.text((600, 220), "Certificate of Course Completion", fill="#0f172a", anchor="mm", font_size=44)
    draw.text((600, 300), "THIS IS TO CERTIFY THAT", fill="#64748b", anchor="mm", font_size=20)
    draw.text((600, 380), "Nithin Asi", fill="#049fd9", anchor="mm", font_size=56)
    draw.text((600, 460), "HAS SUCCESSFULLY COMPLETED THE ACADEMY COURSE", fill="#64748b", anchor="mm", font_size=20)
    draw.text((600, 530), "Python Essentials 1 & 2", fill="#0f172a", anchor="mm", font_size=40)

    draw.text((100, 740), "Cisco Networking Academy", fill="#0f172a", font_size=22)
    draw.text((1100, 740), "Verified Academy Credential", fill="#049fd9", anchor="ra", font_size=22)

    img.save(os.path.join(cert_dir, "cisco_python_certificate.png"))

    print("Successfully created certificate images in assets/certificates/")

if __name__ == "__main__":
    create_certificates()
