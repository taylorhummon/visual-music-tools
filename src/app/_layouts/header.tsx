"use client"

import { usePathname } from "next/navigation"
import { Burger, Divider, Drawer, Group, ScrollArea } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

import styles from "./header.module.scss"


const TOOL_LINKS = [
  { url: "/", label: "Scales" },
  { url: "/modes/", label: "Modes" },
  { url: "/triads/", label: "Triads" },
]
const ABOUT_LINK = { url: "/about/", label: "About" }


export default function Header() {
  const [ opened, { toggle, close } ] = useDisclosure(false)
  const pathname = usePathname()
  const navigationLinks = TOOL_LINKS.map(({ url, label }) =>
    <NavigationLink
      key={label}
      url={url}
      label={label}
      isActive={pathname === url}
    />
  )

  return (
    <header className={styles["header"]}>
      <div className={styles["inner"]}>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            color="white"
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
          <img
            src="/logo.svg"
            alt="Visual Music Tools"
          />
          <Group
            ml={45}
            gap={5}
            visibleFrom="sm"
          >
            {navigationLinks}
          </Group>
        </Group>
        <NavigationLink
          url={ABOUT_LINK.url}
          label={ABOUT_LINK.label}
          isActive={pathname === ABOUT_LINK.url}
        />
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Visual Music Tools"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea
          h="calc(100vh - 80px)"
          mx="-md"
          className={styles["drawer-items"]}
        >
          <Divider
            my="sm"
          />
          {navigationLinks}
        </ScrollArea>
      </Drawer>
    </header>
  )
}

interface NavigationLinkParameters {
  url: string,
  label: string,
  isActive: boolean,
}

function NavigationLink({
  url,
  label,
  isActive,
}: NavigationLinkParameters): React.ReactNode {
  return (
    <a
      href={url}
      className={styles["link"]}
      onClick={
        (event) => { if (isActive) event.preventDefault() }
      }
    >
      {label}
    </a>
  )
}
