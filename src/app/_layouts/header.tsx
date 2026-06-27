"use client"

import { Burger, Divider, Drawer, Group, ScrollArea } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

import styles from "./header.module.scss"


interface NavigationLink {
  url: string,
  label: string,
}

const TOOL_LINKS: Array<NavigationLink> = [
  { url: "/", label: "Scales" },
  { url: "/mode", label: "Modes" },
  { url: "/triad", label: "Triads" },
]
const ABOUT_LINK = { url: "/about", label: "About" }


export default function Header() {
  const [ opened, { toggle, close } ] = useDisclosure(false)
  const navigationLinks = TOOL_LINKS.map(({ url, label }) =>
    <NavigationLink
      key={label}
      url={url}
      label={label}
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

function NavigationLink({
  url,
  label,
}: NavigationLink): React.ReactNode {
  return (
    <a
      href={url}
      className={styles["link"]}
    >
      {label}
    </a>
  )
}
