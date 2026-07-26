/** SEO meta tags via document API */
const SEO = ({ title, description }) => {
  const fullTitle = title ? `${title} | ZAHARA` : 'ZAHARA | Rent. Wear. Shine.'
  const desc = description || 'Premium luxury jewellery rentals for weddings, engagements, parties, and special occasions.'

  if (typeof document !== 'undefined') {
    document.title = fullTitle
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', desc)
  }

  return null
}

export default SEO
