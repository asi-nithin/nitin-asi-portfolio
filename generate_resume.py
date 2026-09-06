import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def create_resume(output_path):
    # Page setup - A4: 595.27 x 841.89 pt
    # Margins: 32pt left/right, 24pt top/bottom
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=32,
        rightMargin=32,
        topMargin=24,
        bottomMargin=24
    )

    styles = getSampleStyleSheet()

    style_name = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=20,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#000000'),
        spaceAfter=4
    )

    style_contact = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#111111'),
        spaceAfter=6
    )

    style_section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=12,
        textColor=colors.HexColor('#000000'),
        spaceBefore=5,
        spaceAfter=1
    )

    style_body = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor('#111111'),
        spaceAfter=3
    )

    style_bullet = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.2,
        leftIndent=10,
        firstLineIndent=-10,
        spaceAfter=1.5,
        textColor=colors.HexColor('#111111')
    )

    style_project_title = ParagraphStyle(
        'ProjectTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11.5,
        spaceBefore=3,
        spaceAfter=1.5,
        textColor=colors.HexColor('#000000')
    )

    story = []

    # 1. Header
    story.append(Paragraph("NITHIN ASI", style_name))

    contact_html = (
        '<a href="mailto:nithinasi005@gmail.com" color="#111111">nithinasi005@gmail.com</a> &nbsp;&bull;&nbsp; '
        '<a href="tel:6309810327" color="#111111">6309810327</a> &nbsp;&bull;&nbsp; '
        'Srikakulam &nbsp;&bull;&nbsp; '
        '<a href="https://github.com/asi-nithin" color="#111111">github.com/asi-nithin</a> &nbsp;&bull;&nbsp; '
        '<a href="https://linkedin.com/in/nithin-asi" color="#111111">linkedin.com/in/nithin-asi</a>'
    )
    story.append(Paragraph(contact_html, style_contact))

    def add_section_header(title):
        story.append(Paragraph(f"<b>{title}</b>", style_section_title))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#000000'), spaceBefore=1, spaceAfter=3))

    # 2. Professional Summary
    add_section_header("PROFESSIONAL SUMMARY")
    summary_text = (
        "AI &amp; ML Engineer skilled in developing and deploying Machine Learning, Deep Learning, and Generative AI solutions using "
        "Python, TensorFlow, and PyTorch. Experienced in building LLM- and RAG-based applications with LangChain, LangGraph, "
        "and vector databases such as FAISS and ChromaDB, and deploying AI applications using FastAPI and Streamlit. Strong "
        "foundation in statistics and data visualization, with a focus on developing scalable, real-world AI solutions."
    )
    story.append(Paragraph(summary_text, style_body))

    # 3. Technical Skills
    add_section_header("TECHNICAL SKILLS")
    skills = [
        ("Programming", "Python, SQL"),
        ("Data Analysis", "NumPy, Pandas, Scikit-learn, Excel, Exploratory Data Analysis (EDA)"),
        ("Statistics", "Probability, Hypothesis Testing, Statistical Inference"),
        ("Machine Learning &amp; Deep Learning", "Machine Learning (ML), Deep Learning (DL), TensorFlow, PyTorch, XGBoost"),
        ("Artificial Intelligence", "Natural Language Processing (NLP), Generative AI (GenAI), Multi-Agent Systems (CrewAI)"),
        ("LLM &amp; AI Frameworks", "RAG, LangChain, LangGraph, Ollama, Hugging Face Transformers, Prompt Engineering"),
        ("Data Visualization", "Matplotlib, Seaborn, Power BI, Tableau"),
        ("Cloud &amp; Deployment", "FastAPI, Flask, Streamlit, Docker"),
        ("Databases &amp; Vector Stores", "SQLite, MySQL, FAISS, ChromaDB, Pinecone"),
        ("Tools &amp; Platforms", "Jupyter Notebook, VS Code, Git, GitHub")
    ]
    for label, val in skills:
        item_text = f"&bull; <b>{label}:</b> {val}"
        story.append(Paragraph(item_text, style_bullet))

    # 4. Projects
    add_section_header("PROJECTS")

    # Project 1
    p1_title = (
        '<a href="https://disease-symptom-prediction-tfa7xadbp4whowm9dw5rtw.streamlit.app/" color="#000000">'
        '<b>Machine Learning-Based Disease Prediction System</b> '
        '<font color="#0056b3" size="8">&#128279;</font></a>'
    )
    story.append(Paragraph(p1_title, style_project_title))
    story.append(Paragraph("&bull; Developed a disease prediction system using <b>Python, Streamlit, and Logistic Regression</b> to predict possible diseases based on user-provided symptoms.", style_bullet))
    story.append(Paragraph("&bull; Achieved <b>92% prediction accuracy</b> through model training and evaluation, with personalized precautions and dietary recommendations.", style_bullet))
    story.append(Paragraph("&bull; Designed an <b>interactive and user-friendly Streamlit interface</b> for real-time symptom analysis and disease prediction.", style_bullet))

    # Project 2
    p2_title = (
        '<a href="https://github.com/asi-nithin" color="#000000">'
        '<b>AI Interview Preparation Copilot</b> '
        '<font color="#0056b3" size="8">&#128279;</font></a>'
    )
    story.append(Paragraph(p2_title, style_project_title))
    story.append(Paragraph("&bull; Built an <b>AI-powered Interview Preparation Copilot</b> using Python, FastAPI, Streamlit, Llama 3.2, and Google Gemini for end-to-end interview preparation.", style_bullet))
    story.append(Paragraph("&bull; Developed <b>resume analysis, mock HR/coding interviews, automated question generation, and AI-based answer evaluation</b> using LLMs and NLP techniques.", style_bullet))
    story.append(Paragraph("&bull; Implemented a <b>dual-LLM architecture with runtime model switching</b>, structured JSON outputs, and real-time performance tracking for actionable feedback.", style_bullet))

    # Project 3
    p3_title = (
        '<a href="https://ai-stock-research-2mv2rdnbxsefrxtk7a89mb.streamlit.app/" color="#000000">'
        '<b>AI Stock Research &amp; Intelligence Platform</b> '
        '<font color="#0056b3" size="8">&#128279;</font></a>'
    )
    story.append(Paragraph(p3_title, style_project_title))
    story.append(Paragraph("&bull; Built a <b>multi-agent AI Stock Research &amp; Intelligence Platform</b> using LangGraph, FastAPI, Streamlit, Gemini, and Groq for comprehensive stock analysis.", style_bullet))
    story.append(Paragraph("&bull; Developed specialized agents for <b>news, financials, technicals, risk, valuation, and peer comparison</b>, generating buy/sell recommendations with confidence scores.", style_bullet))
    story.append(Paragraph("&bull; Implemented <b>live market data, portfolio analysis, screening, AI chat, technical visualizations, Monte Carlo simulation</b>, and automated PDF research reports.", style_bullet))

    # 5. Education
    add_section_header("EDUCATION")
    edu_data = [
        [
            Paragraph("<b>Bachelor of Electronics and Communication Engineering</b>,<br/>Sri Sivani College of Engineering<br/><b>CGPA: 7.02</b>", style_body),
            Paragraph("<font color='#444444'>Oct 2022 &ndash; Apr 2025<br/><i>Srikakulam</i></font>", ParagraphStyle('RightText', parent=style_body, alignment=TA_RIGHT))
        ],
        [
            Paragraph("<b>Diploma - Electronics and Communication Engineering</b>,<br/>Sanketika Polytechnic College<br/><b>CGPA: 8.25</b>", style_body),
            Paragraph("<font color='#444444'>Jul 2019 &ndash; Apr 2022<br/><i>Visakhapatnam</i></font>", ParagraphStyle('RightText', parent=style_body, alignment=TA_RIGHT))
        ],
        [
            Paragraph("<b>SSC</b><br/>Z.P.H.School<br/><b>CGPA: 8.7</b>", style_body),
            Paragraph("<font color='#444444'>Mar 2019<br/><i>Rajapuram</i></font>", ParagraphStyle('RightText', parent=style_body, alignment=TA_RIGHT))
        ]
    ]

    edu_table = Table(edu_data, colWidths=[380, 151])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(edu_table)

    # 6. Certificates
    add_section_header("CERTIFICATES")
    certs = [
        ("Foundation: Introduction to LangChain - Python", "LangChain Academy (ID: 5dgafuzqmz)"),
        ("Python (Basic) Skill Certification", "HackerRank (ID: 2883B4F723E2)"),
        ("Pandas, Intro to Machine Learning &amp; Python", "Kaggle Certificates"),
        ("Python Essentials 1 &amp; 2", "Cisco"),
        ("HTML, CSS &amp; JavaScript (Basic)", "Rugvedha Technologies Pvt. Ltd.")
    ]
    for cert, org in certs:
        story.append(Paragraph(f"&bull; <b>{cert}</b> &mdash; {org}", style_bullet))

    doc.build(story)
    print(f"Successfully generated resume PDF at {output_path}")

if __name__ == "__main__":
    output_pdf = os.path.join(os.getcwd(), "assets", "Nithin_Asi_resume.pdf")
    create_resume(output_pdf)
    output_pdf_alt = os.path.join(os.getcwd(), "assets", "Nitin_Asi_Resume.pdf")
    create_resume(output_pdf_alt)
