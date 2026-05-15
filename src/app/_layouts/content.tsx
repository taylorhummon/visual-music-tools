import styles from "./content.module.scss"


interface ContentInput {
  children: React.ReactNode,
}

export default function Content({
  children,
}: ContentInput): React.ReactNode {
  return (
    <div className={styles["page"]}>
      <main className={styles["main-content"]} aria-label="Content">
        {children}
      </main>
    </div>
  )
}
