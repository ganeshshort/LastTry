const config = window.HELLO_CONFIG || {};
const form = document.querySelector('#response-form');
const field = document.querySelector('#instagram-field');
const instagram = document.querySelector('#instagram');
const status = document.querySelector('#form-status');
const labels = {
  not_interested: 'Not interested, thanks',
  friendly_chat: 'Open to a friendly chat'
};
if (config.senderName?.trim()) {
  const signature = document.querySelector('#signature');
  signature.textContent = `— ${config.senderName.trim()}`;
  signature.hidden = false;
}
if (config.linkedinUrl) document.querySelector('#linkedin-link').href = config.linkedinUrl;
form.addEventListener('change', () => {
  const friendly = form.elements.choice.value === 'friendly_chat';
  field.hidden = !friendly;
  instagram.disabled = !friendly;
  if (!friendly) instagram.value = '';
  status.textContent = '';
});
instagram.disabled = true;
form.addEventListener('submit', event => {
  event.preventDefault();
  const choice = form.elements.choice.value;
  if (!Object.hasOwn(labels, choice)) return;
  const profile = choice === 'friendly_chat' ? instagram.value.trim() : '';
  const body = `Hi,\n\nMy response to your little hello: ${labels[choice]}.\n${profile ? `\nMy Instagram: ${profile}\n` : ''}\nWishing you well!`;
  const url = new URL('https://mail.google.com/mail/');
  url.search = new URLSearchParams({ view: 'cm', fs: '1', to: config.recipientEmail, su: 'A little hello — my response', body }).toString();
  document.querySelector('#open-gmail').href = url.href;
  window.open(url.href, '_blank', 'noopener,noreferrer');
  status.textContent = 'Your draft is ready to review and send in Gmail.';
  const thanks = document.querySelector('#thank-you');
  thanks.hidden = false;
});
