// Wikimedia Commons "Special:Redirect" URLs accept a `width` query param, so a card
// thumbnail (~400px wide in the grid) doesn't need to ship the same bytes as a
// full-bleed hero. Photos uploaded through the back-office (Supabase Storage) don't
// support on-the-fly resizing, so those simply fall back to a plain <img src>.
const WIDTH_PARAM = /([?&])width=\d+/

export const cardSrcset = (url, widths = [480, 800, 1200]) => {
  if (!url || !WIDTH_PARAM.test(url)) return { src: url, srcset: '' }

  const at = (width) => url.replace(WIDTH_PARAM, `$1width=${width}`)

  return {
    src: at(widths[1] ?? widths[0]),
    srcset: widths.map((width) => `${at(width)} ${width}w`).join(', '),
  }
}
