import styles from "./content.module.scss"


interface ContentParameters {
  children: React.ReactNode,
}

export default function Content({
  children,
}: ContentParameters): React.ReactNode {
  return (
    <div className={styles["page"]}>
      <main className={styles["main-content"]} aria-label="Content">
        {children}
      </main>
    </div>
  )
}
