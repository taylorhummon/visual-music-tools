import { ScalesTool } from "@scalesTool/ScalesTool"

import styles from "./page.module.scss"


export default function Page() {
  return (
    <>
      <h1>
        Scales Tool
      </h1>
      <ul className={styles["instructions"]}>
        <li>
          Arrow buttons change keys within a mode.
        </li>
        <li>
          Sharp and flat buttons move between parallel keys.
        </li>
        <li>
          Blue dot buttons move between relative keys.
        </li>
      </ul>
      <ScalesTool />
    </>
  )
}
