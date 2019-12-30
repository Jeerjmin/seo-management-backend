import { BrokenLinkSourceType } from './BrokenLinkSourceType'

export class BrokenLinkSourceFactory {
  private constructor() {}

  static getSource(html: any, shopPrefix: string): BrokenLinkSourceType {
    const {
      selector,
      attrs: { class: className, title },
    } = html
    const shopName = shopPrefix.replace('.myshopify.com', '')

    if (className && (className.includes('nav-link') || className.includes('nav__link'))) {
      return BrokenLinkSourceType.HEADER_NAVIGATION
    } else if (className && className.includes('link-block')) {
      return BrokenLinkSourceType.LINK_BLOCK
    } else if (title && title.includes(`${shopName} on`)) {
      return BrokenLinkSourceType.SOCIAL
    } else if (selector.includes('footer')) {
      return BrokenLinkSourceType.FOOTER_NAVIGATION
    } else {
      return BrokenLinkSourceType.UNKNOWN
    }
  }
}
