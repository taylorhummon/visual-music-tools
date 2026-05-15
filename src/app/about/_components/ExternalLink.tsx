interface ExternalLinkInput {
  href: string,
  children: React.ReactNode,
}

export default function ExternalLink({
  href,
  children,
}: ExternalLinkInput): React.ReactNode {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
