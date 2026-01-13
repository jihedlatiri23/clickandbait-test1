// Calendly URL - Update YOUR_USERNAME with your actual Calendly username
// Or set it via window.CALENDLY_URL from server (see layout.ejs)
const CALENDLY_URL = window.CALENDLY_URL || 'https://calendly.com/jihedlatiri/30min';

let intakeFormData = null;

function openIntakeForm() {
  const modal = document.getElementById('intakeModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeIntakeForm() {
  const modal = document.getElementById('intakeModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleOtherReason() {
  const reasonSelect = document.getElementById('intakeReason');
  const otherGroup = document.getElementById('otherReasonGroup');
  const otherInput = document.getElementById('otherReason');
  
  if (reasonSelect && otherGroup && otherInput) {
    if (reasonSelect.value === 'other') {
      otherGroup.style.display = 'block';
      otherInput.required = true;
    } else {
      otherGroup.style.display = 'none';
      otherInput.required = false;
    }
  }
}

function submitIntakeForm(event) {
  event.preventDefault();
  
  const form = document.getElementById('intakeForm');
  const formData = new FormData(form);
  
  intakeFormData = {
    reason: formData.get('reason'),
    otherReason: formData.get('otherReason') || '',
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone') || '',
    company: formData.get('company'),
    website: formData.get('website') || '',
    businessType: formData.get('businessType'),
    budget: formData.get('budget')
  };
  
  console.log('Intake Form Data:', intakeFormData);
  
  closeIntakeForm();
  
  openCalendlyWithPrefill();
}

function openCalendlyWithPrefill() {
  const prefillData = intakeFormData ? {
    name: `${intakeFormData.firstName} ${intakeFormData.lastName}`,
    email: intakeFormData.email,
    customAnswers: {
      a1: intakeFormData.reason === 'other' ? intakeFormData.otherReason : intakeFormData.reason,
      a2: intakeFormData.company,
      a3: intakeFormData.businessType,
      a4: intakeFormData.budget,
      a5: intakeFormData.phone,
      a6: intakeFormData.website
    }
  } : {};
  
  if (typeof Calendly !== 'undefined') {
    Calendly.initPopupWidget({
      url: CALENDLY_URL,
      prefill: prefillData
    });
  } else {
    const params = new URLSearchParams();
    if (intakeFormData) {
      params.set('name', `${intakeFormData.firstName} ${intakeFormData.lastName}`);
      params.set('email', intakeFormData.email);
    }
    window.open(`${CALENDLY_URL}?${params.toString()}`, '_blank');
  }
  
  intakeFormData = null;
}

function openCalendly() {
  openIntakeForm();
}

document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    localStorage.setItem('theme', newTheme);
  });

  const langDropdownBtn = document.getElementById('langDropdownBtn');
  const langDropdown = langDropdownBtn?.closest('.lang-dropdown');

  if (langDropdownBtn && langDropdown) {
    langDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeIntakeForm();
    }
  });
});
