interface LinkIcon {
  [key: string]: { tag: string, color: string, background: string } | undefined;
}

const linkIconObject: LinkIcon = {
  github: { tag: 'github', color: 'FFFFFF', background: '#181717' },
  kakao: { tag: 'kakaotalk', color: '3A1D1D', background: '#FFCD00' },
  discord: { tag: 'discord', color: 'FFFFFF', background: '#5865F2' },
};

export const LinkIconList = Object.keys(linkIconObject);

const linkIcons = {
  getLinkIcon: (tag: string) => {
    tag = tag.toLowerCase();
    if (linkIconObject[tag])
      return linkIconObject[tag];
    return { tag: tag, color: '333333', background: '#FFFFFF' };
  }
};

export default linkIcons;