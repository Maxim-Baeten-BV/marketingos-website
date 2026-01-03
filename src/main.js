import './style.css'

// Set current year in footer (if element exists)
const currentYearEl = document.getElementById('current-year')
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear()
}

// Google Apps Script URL - Replace with your deployed Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzauo6RL_S7FThlRbrfmFi6htch2EktIeeWRUM6DSovy8PUlycOW4mvsxph_C2euzM/exec'

// Waitlist Modal Functions
window.openWaitlistModal = function() {
  const modal = document.getElementById('waitlist-modal')
  if (!modal) return

  modal.classList.remove('hidden')
  document.body.style.overflow = 'hidden'

  // Focus on email input
  setTimeout(() => {
    const emailInput = document.getElementById('waitlist-email')
    if (emailInput) emailInput.focus()
  }, 100)
}

window.closeWaitlistModal = function() {
  const modal = document.getElementById('waitlist-modal')
  if (!modal) return

  modal.classList.add('hidden')
  document.body.style.overflow = ''

  // Reset form state after a short delay
  setTimeout(() => {
    resetWaitlistForm()
  }, 300)
}

window.resetWaitlistForm = function() {
  const formContainer = document.getElementById('waitlist-form-container')
  const successEl = document.getElementById('waitlist-success')
  const errorEl = document.getElementById('waitlist-error')
  const form = document.getElementById('waitlist-form')
  const submitBtn = document.getElementById('waitlist-submit-btn')

  if (formContainer) formContainer.classList.remove('hidden')
  if (successEl) successEl.classList.add('hidden')
  if (errorEl) errorEl.classList.add('hidden')
  if (form) form.reset()
  if (submitBtn) {
    submitBtn.disabled = false
    submitBtn.textContent = 'Join the waitlist'
  }
}

window.submitWaitlistForm = async function(event) {
  event.preventDefault()

  const emailInput = document.getElementById('waitlist-email')
  const submitBtn = document.getElementById('waitlist-submit-btn')

  if (!emailInput || !submitBtn) return

  const email = emailInput.value.trim()
  if (!email) return

  // Disable button and show loading state
  submitBtn.disabled = true
  submitBtn.textContent = 'Joining...'

  try {
    // Call Google Apps Script using form data (works better with CORS)
    const formData = new FormData()
    formData.append('email', email)
    formData.append('source', window.location.pathname)

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })

    // With no-cors mode, we can't read the response, so we assume success
    // Show success message
    const formContainer = document.getElementById('waitlist-form-container')
    const successEl = document.getElementById('waitlist-success')

    if (formContainer) formContainer.classList.add('hidden')
    if (successEl) successEl.classList.remove('hidden')

    // Track conversion in GTM dataLayer if available
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'waitlist_signup',
        email_domain: email.split('@')[1]
      })
    }
  } catch (error) {
    console.error('Waitlist signup error:', error)

    // Show error message
    const formContainer = document.getElementById('waitlist-form-container')
    const errorEl = document.getElementById('waitlist-error')
    const errorMsg = document.getElementById('waitlist-error-message')

    if (formContainer) formContainer.classList.add('hidden')
    if (errorEl) errorEl.classList.remove('hidden')
    if (errorMsg) errorMsg.textContent = 'Something went wrong. Please try again later.'
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('waitlist-modal')
    if (modal && !modal.classList.contains('hidden')) {
      closeWaitlistModal()
    }
  }
})
