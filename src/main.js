import './style.css'

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear()

// Google Apps Script URL - Replace with your deployed Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzauo6RL_S7FThlRbrfmFi6htch2EktIeeWRUM6DSovy8PUlycOW4mvsxph_C2euzM/exec'

// Waitlist Modal Functions
window.openWaitlistModal = function() {
  const modal = document.getElementById('waitlist-modal')
  modal.classList.remove('hidden')
  document.body.style.overflow = 'hidden'

  // Focus on email input
  setTimeout(() => {
    document.getElementById('waitlist-email').focus()
  }, 100)
}

window.closeWaitlistModal = function() {
  const modal = document.getElementById('waitlist-modal')
  modal.classList.add('hidden')
  document.body.style.overflow = ''

  // Reset form state after a short delay
  setTimeout(() => {
    resetWaitlistForm()
  }, 300)
}

window.resetWaitlistForm = function() {
  document.getElementById('waitlist-form-container').classList.remove('hidden')
  document.getElementById('waitlist-success').classList.add('hidden')
  document.getElementById('waitlist-error').classList.add('hidden')
  document.getElementById('waitlist-form').reset()
  document.getElementById('waitlist-submit-btn').disabled = false
  document.getElementById('waitlist-submit-btn').textContent = 'Join the waitlist'
}

window.submitWaitlistForm = async function(event) {
  event.preventDefault()

  const emailInput = document.getElementById('waitlist-email')
  const submitBtn = document.getElementById('waitlist-submit-btn')
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
    document.getElementById('waitlist-form-container').classList.add('hidden')
    document.getElementById('waitlist-success').classList.remove('hidden')

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
    document.getElementById('waitlist-form-container').classList.add('hidden')
    document.getElementById('waitlist-error').classList.remove('hidden')
    document.getElementById('waitlist-error-message').textContent =
      'Something went wrong. Please try again later.'
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('waitlist-modal')
    if (!modal.classList.contains('hidden')) {
      closeWaitlistModal()
    }
  }
})
