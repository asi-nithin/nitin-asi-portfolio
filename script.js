// Nitin Asi Portfolio Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypewriter();
  initNavigation();
  initDemoSimulator();
  initCertificatesModal();
  initContactForm();
});

/* --------------------------------------------------
   1. HTML5 Neural Network Background Canvas
-------------------------------------------------- */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  });

  let nodes = [];
  const nodeCount = Math.floor((width * height) / 18000);
  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function initNodes() {
    nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00f2fe' : '#6366f1'
      });
    }
  }

  initNodes();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - node.x;
        let dy = mouse.y - node.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          node.x -= (dx / dist) * 0.8;
          node.y -= (dy / dist) * 0.8;
        }
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        let nodeB = nodes[j];
        let dx = node.x - nodeB.x;
        let dy = node.y - nodeB.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.18 - dist / 120})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------
   2. Typewriter Effect
-------------------------------------------------- */
function initTypewriter() {
  const target = document.querySelector('.typed-text');
  if (!target) return;

  const phrases = [
    'Data Science & GenAI Engineer',
    'LLM & RAG Application Architect',
    'Machine Learning Specialist',
    'Prompt Engineering & Agentic Workflows'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      target.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------
   3. Navigation & Smooth Scroll
-------------------------------------------------- */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------
   4. Interactive AI Demo Simulator
-------------------------------------------------- */
function initDemoSimulator() {
  // Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const demoPanels = document.querySelectorAll('.demo-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.remove('active'));
      demoPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(tabTarget);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // AI Stock Research Simulation
  const runStockBtn = document.getElementById('run-stock-btn');
  if (runStockBtn) {
    runStockBtn.addEventListener('click', () => {
      const ticker = document.getElementById('ticker-select').value;
      const agent = document.getElementById('agent-select').value;
      const outputBox = document.getElementById('stock-output');

      outputBox.innerHTML = `
<div class="typing-indicator" style="color: var(--accent-cyan); font-weight: bold; margin-bottom: 0.5rem;">
  ⚡ Spawning LangGraph Multi-Agent Workflow for ${ticker}...
</div>
`;

      setTimeout(() => {
        let analysisData = {};
        if (ticker === 'NVDA') {
          analysisData = {
            ticker: "NVDA",
            company: "NVIDIA Corporation",
            consensus: "STRONG BUY",
            confidence: "94.8%",
            agents_active: ["News Sentiment", "Technical RSI/MACD", "Monte Carlo Risk", "DCF Valuation"],
            target_price: "$145.50",
            monte_carlo_var_95: "-4.2% (Low Downside Risk)"
          };
        } else if (ticker === 'AAPL') {
          analysisData = {
            ticker: "AAPL",
            company: "Apple Inc.",
            consensus: "BUY",
            confidence: "88.2%",
            agents_active: ["Ecosystem Growth", "DCF Valuation", "Technical Moving Avg"],
            target_price: "$240.00",
            monte_carlo_var_95: "-2.8% (Moderate Risk)"
          };
        } else if (ticker === 'TSLA') {
          analysisData = {
            ticker: "TSLA",
            company: "Tesla Inc.",
            consensus: "HOLD / VOLATILE",
            confidence: "79.4%",
            agents_active: ["Volatility Risk", "News Momentum", "Automotive & Energy Margin"],
            target_price: "$225.00",
            monte_carlo_var_95: "-8.5% (High Volatility)"
          };
        } else {
          analysisData = {
            ticker: "MSFT",
            company: "Microsoft Corp.",
            consensus: "STRONG BUY",
            confidence: "92.1%",
            agents_active: ["Cloud Azure Growth", "GenAI Enterprise Adoption", "DCF Valuation"],
            target_price: "$480.00",
            monte_carlo_var_95: "-3.1% (Low Downside Risk)"
          };
        }

        outputBox.innerHTML = `
<span style="color: #6366f1;">// LANGGRAPH MULTI-AGENT STOCK INTELLIGENCE OUTPUT</span>
{
  <span style="color: #38bdf8;">"status"</span>: <span style="color: #10b981;">"200 EXECUTED"</span>,
  <span style="color: #38bdf8;">"symbol"</span>: <span style="color: #f59e0b;">"${analysisData.ticker}"</span>,
  <span style="color: #38bdf8;">"company_name"</span>: <span style="color: #f59e0b;">"${analysisData.company}"</span>,
  <span style="color: #38bdf8;">"agent_consensus"</span>: <span style="color: #10b981; font-weight: bold;">"${analysisData.consensus}"</span>,
  <span style="color: #38bdf8;">"confidence_score"</span>: <span style="color: #00f2fe;">"${analysisData.confidence}"</span>,
  <span style="color: #38bdf8;">"12m_target_price"</span>: <span style="color: #10b981;">"${analysisData.target_price}"</span>,
  <span style="color: #38bdf8;">"monte_carlo_95_var"</span>: <span style="color: #f59e0b;">"${analysisData.monte_carlo_var_95}"</span>,
  <span style="color: #38bdf8;">"contributing_agents"</span>: [
    ${analysisData.agents_active.map(a => `\n    <span style="color: #a855f7;">"${a}"</span>`).join(',')}
  ]
}
`;
      }, 700);
    });
  }

  // AI Interview Copilot Simulation
  const runInterviewBtn = document.getElementById('run-interview-btn');
  if (runInterviewBtn) {
    runInterviewBtn.addEventListener('click', () => {
      const role = document.getElementById('role-select').value;
      const exp = document.getElementById('exp-select').value;
      const outputBox = document.getElementById('copilot-output');

      outputBox.innerHTML = `
<div class="typing-indicator" style="color: var(--accent-cyan); font-weight: bold; margin-bottom: 0.5rem;">
  ⚡ Connecting to Dual-LLM Orchestration (Llama 3.2 + Gemini)...
</div>
`;

      setTimeout(() => {
        let questionData = {};
        if (role === 'genai') {
          questionData = {
            role: "Generative AI Engineer",
            level: exp,
            architecture: "LangChain / RAG Dual-LLM Pipeline",
            question: "How do you evaluate hallucination rate and retrieval precision in a hybrid FAISS + Chroma DB RAG architecture for complex domain queries?",
            rubric: ["Vector Similarity Threshold", "RAGAS Metrics", "Context Relevancy Score", "Structured JSON Schema Response"]
          };
        } else if (role === 'ml') {
          questionData = {
            role: "Machine Learning Engineer",
            level: exp,
            architecture: "Scikit-Learn / FastAPI Pipeline",
            question: "Given a highly imbalanced disease prediction dataset, how would you address feature collinearity and optimize model precision vs recall?",
            rubric: ["SMOTE Oversampling", "Confusion Matrix Analysis", "Precision-Recall AUC", "Cross-Validation"]
          };
        } else {
          questionData = {
            role: "Data Scientist",
            level: exp,
            architecture: "Exploratory Data Analysis & Statistical Modeling",
            question: "Walk through your methodology for hypothesis testing and feature selection before training a Logistic Regression model.",
            rubric: ["p-value significance", "Chi-Square Test", "Correlation Heatmaps", "Standard Scaling"]
          };
        }

        outputBox.innerHTML = `
<span style="color: #6366f1;">// AI INTERVIEW COPILOT RESPONSE - JSON OUTPUT</span>
{
  <span style="color: #38bdf8;">"status"</span>: <span style="color: #10b981;">"200 OK"</span>,
  <span style="color: #38bdf8;">"selected_role"</span>: <span style="color: #f59e0b;">"${questionData.role}"</span>,
  <span style="color: #38bdf8;">"candidate_level"</span>: <span style="color: #f59e0b;">"${questionData.level}"</span>,
  <span style="color: #38bdf8;">"eval_architecture"</span>: <span style="color: #f59e0b;">"${questionData.architecture}"</span>,
  <span style="color: #38bdf8;">"generated_question"</span>: <span style="color: #00f2fe;">"${questionData.question}"</span>,
  <span style="color: #38bdf8;">"evaluation_criteria"</span>: [
    ${questionData.rubric.map(item => `\n    <span style="color: #a855f7;">"${item}"</span>`).join(',')}
  ]
}
`;
      }, 700);
    });
  }

  // Disease Prediction Simulation
  const runPredictBtn = document.getElementById('run-predict-btn');
  if (runPredictBtn) {
    runPredictBtn.addEventListener('click', () => {
      const selectedSymptoms = Array.from(document.querySelectorAll('.symptom-cb:checked')).map(cb => cb.value);
      const outputBox = document.getElementById('predict-output');

      if (selectedSymptoms.length === 0) {
        outputBox.innerHTML = `<span style="color: #ef4444;">⚠️ Please select at least one symptom to run the prediction model.</span>`;
        return;
      }

      outputBox.innerHTML = `
<div style="color: var(--accent-cyan); font-weight: bold;">
  ⚙️ Running Logistic Regression Model Inference (Accuracy: 92%)...
</div>
`;

      setTimeout(() => {
        let predictedDisease = "Viral Infection / Common Flu";
        let confidence = "94.2%";
        let recommendations = ["Rest & Hydration", "Paracetamol for fever relief", "Monitor body temperature"];

        if (selectedSymptoms.includes('cough') && selectedSymptoms.includes('shortness_of_breath')) {
          predictedDisease = "Respiratory Tract Infection";
          confidence = "91.8%";
          recommendations = ["Steam inhalation", "Consult medical practitioner", "Pulmonology evaluation"];
        } else if (selectedSymptoms.includes('joint_pain') && selectedSymptoms.includes('fever')) {
          predictedDisease = "Inflammatory Arthralgia / Viral Fever";
          confidence = "89.5%";
          recommendations = ["Cold compress", "Hydration with electrolytes", "Inflammatory markers test"];
        } else if (selectedSymptoms.includes('headache') && selectedSymptoms.includes('nausea')) {
          predictedDisease = "Migraine / Dehydration";
          confidence = "93.0%";
          recommendations = ["Quiet dark room rest", "Fluid intake", "Avoid bright screen exposure"];
        }

        outputBox.innerHTML = `
<span style="color: #6366f1;">// ML DISEASE PREDICTION RESULT</span>
{
  <span style="color: #38bdf8;">"input_symptoms"</span>: [${selectedSymptoms.map(s => `"${s}"`).join(', ')}],
  <span style="color: #38bdf8;">"predicted_condition"</span>: <span style="color: #10b981; font-weight: bold;">"${predictedDisease}"</span>,
  <span style="color: #38bdf8;">"model_confidence"</span>: <span style="color: #00f2fe;">"${confidence}"</span>,
  <span style="color: #38bdf8;">"recommendations"</span>: [
    ${recommendations.map(r => `\n    <span style="color: #f59e0b;">"${r}"</span>`).join(',')}
  ]
}
`;
      }, 600);
    });
  }
}

/* --------------------------------------------------
   5. Helper: Copy Email & Toast Notification
-------------------------------------------------- */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied to clipboard: ${text}`);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-cyan);"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --------------------------------------------------
   6. Contact Form Submission Handling
-------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    showToast('Thank you! Your message has been prepared for Nitin Asi.');
    contactForm.reset();
  });
}

/* --------------------------------------------------
   7. Verified Certificates Modal Handler
-------------------------------------------------- */
function initCertificatesModal() {
  const certCards = document.querySelectorAll('.cert-card[data-cert]');
  const modalOverlay = document.getElementById('cert-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');

  if (!modalOverlay || !modalContent) return;

  const certDetails = {
    'langchain': {
      title: 'Foundation: Introduction to LangChain - Python',
      provider: 'LangChain Academy',
      badgeClass: 'provider-langchain',
      icon: 'fas fa-link',
      issued: 'September 05, 2026',
      validity: 'Sep 05, 2026 – Sep 04, 2028',
      certId: '5dgafuzqmz',
      recipient: 'Nithin Asi',
      imgSrc: 'assets/certificates/langchain_certificate.png',
      summary: 'Comprehensive hands-on certification covering LLM application development, prompt management, vector index retriever architectures, RAG memory components, and autonomous agent creation using LangChain and Python.',
      skills: ['LangChain Framework', 'RAG Architecture', 'Vector Stores & Embeddings', 'Prompt Engineering', 'LLM Agentic Tooling']
    },
    'hackerrank': {
      title: 'Python (Basic) Skill Certification',
      provider: 'HackerRank Certification',
      badgeClass: 'provider-hackerrank',
      icon: 'fab fa-hackerrank',
      issued: 'July 02, 2026',
      validity: 'Lifetime Verified',
      certId: '2883B4F723E2',
      recipient: 'Nithin Asi',
      imgSrc: 'assets/certificates/hackerrank_python_certificate.png',
      summary: 'Proctored technical assessment validating advanced proficiency in Python 3 programming, data structure manipulation, algorithm design, control flow, object-oriented concepts, and error handling.',
      skills: ['Python 3', 'Algorithms', 'Data Structures', 'Functional Programming', 'String & Array Operations']
    },
    'kaggle-ml': {
      title: 'Intro to Machine Learning',
      provider: 'Kaggle Learn',
      badgeClass: 'provider-kaggle',
      icon: 'fab fa-kaggle',
      issued: 'May 09, 2026',
      instructor: 'Dan Becker (Kaggle Instructor)',
      recipient: 'Nithin Asi',
      imgSrc: 'assets/certificates/kaggle_ml_certificate.png',
      summary: 'Practical certification in core machine learning workflows including exploratory data analysis, decision trees, random forest ensemble modeling, cross-validation metrics, and scikit-learn model optimization.',
      skills: ['Machine Learning', 'Scikit-Learn', 'Decision Trees', 'Random Forests', 'Model Validation']
    },
    'kaggle-pandas': {
      title: 'Pandas Data Analysis',
      provider: 'Kaggle Learn',
      badgeClass: 'provider-kaggle',
      icon: 'fab fa-kaggle',
      issued: 'August 28, 2026',
      instructor: 'Aleksey Bilogur (Kaggle Instructor)',
      recipient: 'Nithin Asi',
      imgSrc: 'assets/certificates/kaggle_pandas_certificate.png',
      summary: 'Specialized data manipulation certification focusing on complex DataFrame transformations, indexing strategies, summary functions, group-by aggregations, data cleaning, and merging large multi-source datasets.',
      skills: ['Pandas DataFrames', 'Data Cleaning', 'Groupby Aggregations', 'Exploratory Data Analysis', 'Series Operations']
    },
    'kaggle-python': {
      title: 'Python Programming',
      provider: 'Kaggle Learn',
      badgeClass: 'provider-kaggle',
      icon: 'fab fa-kaggle',
      issued: 'April 04, 2026',
      instructor: 'Colin Morris (Kaggle Instructor)',
      recipient: 'Nithin Asi',
      imgSrc: 'assets/certificates/kaggle_python_certificate.png',
      summary: 'Foundational data science Python certification emphasizing algorithmic thinking, list comprehensions, dictionary indexing, custom function design, and external scientific library integration.',
      skills: ['Python Syntax', 'List Comprehensions', 'Custom Functions', 'Control Flow', 'Library Modules']
    },
    'cisco': {
      title: 'Python Essentials 1 & 2',
      provider: 'Cisco Networking Academy',
      badgeClass: 'provider-cisco',
      icon: 'fas fa-network-wired',
      issued: 'Completed',
      validity: 'Verified Academy Credential',
      recipient: 'Nithin Asi',
      imgSrc: 'assets/certificates/cisco_python_certificate.png',
      summary: 'Two-part comprehensive Cisco curriculum covering fundamental and intermediate Python programming, object-oriented software design, generator functions, exception processing, and modular software packaging.',
      skills: ['Python Fundamentals', 'Object-Oriented Programming', 'Modules & Packages', 'Exception Handling', 'File I/O']
    }
  };

  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.dataset.cert;
      const data = certDetails[key];
      if (!data) return;

      modalContent.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <div class="cert-provider-badge ${data.badgeClass}">
            <i class="${data.icon}"></i> ${data.provider}
          </div>
          <span style="color: var(--accent-emerald); font-size: 0.85rem; font-weight: 600;">
            <i class="fas fa-certificate"></i> Verified Certificate
          </span>
        </div>

        <div style="margin-bottom: 1rem; border-radius: var(--radius-md); overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); background: #0b0f17;">
          <img src="${data.imgSrc}" alt="${data.title}" style="width: 100%; height: auto; display: block;">
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.3rem; line-height: 1.3;">
          ${data.title}
        </h2>
        <p style="color: var(--accent-cyan); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">
          Awarded to: ${data.recipient}
        </p>

        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-md); padding: 0.8rem; margin-bottom: 1rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
          ${data.summary}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1rem; font-size: 0.82rem; color: var(--text-muted);">
          <div><strong style="color: var(--text-primary);">Issued Date:</strong> ${data.issued}</div>
          ${data.certId ? `<div><strong style="color: var(--text-primary);">Certificate ID:</strong> <code style="color: var(--accent-cyan);">${data.certId}</code></div>` : ''}
          ${data.instructor ? `<div><strong style="color: var(--text-primary);">Instructor:</strong> ${data.instructor}</div>` : ''}
          ${data.validity ? `<div><strong style="color: var(--text-primary);">Validity:</strong> ${data.validity}</div>` : ''}
        </div>

        <div style="margin-bottom: 1.2rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.4rem;">Key Competencies:</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
            ${data.skills.map(s => `<span class="tech-badge" style="background: rgba(99, 102, 241, 0.15); color: #a5b4fc;">${s}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem;">
          <a href="${data.imgSrc}" download="${key}_certificate.png" class="btn btn-primary" style="padding: 0.4rem 1.1rem; font-size: 0.85rem;">
            <i class="fas fa-download"></i> Download Image
          </a>
          <button onclick="closeCertModal()" class="btn btn-outline" style="padding: 0.4rem 1.1rem; font-size: 0.85rem;">
            Close
          </button>
        </div>
      `;

      modalOverlay.classList.add('active');
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCertModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeCertModal();
  });
}

function closeCertModal() {
  const modalOverlay = document.getElementById('cert-modal');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

