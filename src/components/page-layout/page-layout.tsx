import styles from "./page-layout.module.css";
import {FC, ReactNode} from "react";

interface IPageLayout {
    children: ReactNode;
}

const PageLayout: FC<IPageLayout> = ({children}) => {
    return <main className={styles.layout}>{children}</main>;
};

export default PageLayout;
